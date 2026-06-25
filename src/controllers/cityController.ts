import { CityErrors, CountryErrors, StateErrors } from '../errors';
import { Request, Response } from 'express';
import { ICity } from '../types/custom';
import city from '../models/cityModel';
import country from '../models/countryModel';
import state from '../models/stateModel';
import { ObjectId } from 'mongodb';

const getCities = async (req: Request, res: Response) => {
	try {
		const cities = await city
			.find({})
			.select('_id name stateId countryId')
			.lean();

		res.json(cities);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getCitiesOfState = async (req: Request, res: Response) => {
	try {
		// This is the state short name
		const { shortName } = req.params;

		if (!shortName) {
			return res
				.status(400)
				.json({ message: StateErrors.STATE_SHORTNAME_REQUIRED });
		}

		const aState = await state.findOne({
			shortName: shortName,
		});

		if (!aState) {
			return res
				.status(404)
				.json({ message: StateErrors.NO_STATE_FOUND });
		}

		const cities = await city
			.find({ stateId: aState._id })
			.select('_id name stateId countryId')
			.lean();

		res.json(cities);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getCitiesOfCountry = async (req: Request, res: Response) => {
	try {
		// this is the country code
		const { code } = req.params;

		if (!code) {
			return res
				.status(400)
				.json({ message: CountryErrors.COUNTRY_CODE_IS_REQUIRED });
		}

		const aCountry = await country.findOne({
			code: code,
		});

		if (!aCountry) {
			return res
				.status(404)
				.json({ message: CountryErrors.NO_COUNTRY_FOUND });
		}

		const cities: ICity[] = await city.find({
			countryId: aCountry._id,
		});

		res.json(cities);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getCity = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: CityErrors.CITY_ID_IS_REQUIRED });
		}

		const aCity = await city.findOne({
			_id: new ObjectId(id),
		});

		if (!aCity) {
			return res.status(404).json({ message: CityErrors.NO_CITY_FOUND });
		}

		res.status(200).json(aCity);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const addCity = async (req: Request, res: Response) => {
	const { name, stateId, countryId } = req.body;

	try {
		/// check if the city exists in db
		const aCity: ICity | null = await city.findOne({
			countryId: countryId,
			stateId: stateId,
			name: name.toString(),
		});

		if (aCity) {
			return res
				.status(400)
				.json({ message: CityErrors.CITY_ALREADY_EXISTS });
		}

		// create new city document in db
		const newCity = new city({
			countryId: countryId,
			stateId: stateId,
			name: name.toString(),
		});

		await newCity.save();

		res.status(200).json({ message: 'City added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteCity = async (req: Request, res: Response) => {
	try {
		const aCity = await city.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!aCity) {
			res.status(404).json({
				message: CityErrors.NO_CITY_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export {
	addCity,
	getCities,
	getCitiesOfState,
	getCitiesOfCountry,
	getCity,
	deleteCity,
};
