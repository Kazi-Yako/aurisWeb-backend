import { CountryErrors } from '../errors';
import { Request, Response } from 'express';
import { ICountry } from '../types/custom';
import country from '../models/countryModel';
import { ObjectId } from 'mongodb';

const getCountries = async (req: Request, res: Response) => {
	try {
		const countries = await country.find({}).select('_id name code').lean();
		res.json(countries);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getCountry = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: CountryErrors.COUNTRY_ID_IS_REQUIRED });
		}

		const aCountry = await country.findOne({
			_id: new ObjectId(id),
		});

		if (!aCountry) {
			return res
				.status(404)
				.json({ message: CountryErrors.NO_COUNTRY_FOUND });
		}

		res.status(200).json(aCountry);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const addCountry = async (req: Request, res: Response) => {
	const { _id, name } = req.body;

	try {
		let idUpper = _id.toString().toUpperCase();
		let nameUpper = name.toString().toUpperCase();

		// check if the country exists in db
		const aCountry: ICountry | null = await country.findOne({
			_id: idUpper,
			name: nameUpper,
		});

		if (aCountry) {
			return res
				.status(400)
				.json({ message: CountryErrors.COUNTRY_ALREADY_EXISTS });
		}

		// create new country document in db
		const newCountry = new country({
			_id: idUpper,
			name: nameUpper,
		});

		await newCountry.save();

		res.status(200).json({ message: 'Country added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteCountry = async (req: Request, res: Response) => {
	try {
		const aCountry = await country.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!aCountry) {
			res.status(404).json({
				message: CountryErrors.NO_COUNTRY_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { addCountry, getCountries, getCountry, deleteCountry };
