import { StateErrors, CountryErrors } from '../errors';
import { Request, Response } from 'express';
import { IState } from '../types/custom';
import state from '../models/stateModel';
import country from '../models/countryModel';
import { ObjectId } from 'mongodb';

const getStates = async (req: Request, res: Response) => {
	try {
		const states = await state
			.find({})
			.select('_id name shortName countryId')
			.lean();
		res.json(states);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getStatesOfCountry = async (req: Request, res: Response) => {
	try {
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

		const states = await state
			.find({ countryId: aCountry._id })
			.select('_id name shortName countryId')
			.lean();

		res.json(states);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const getState = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		if (!id) {
			return res
				.status(400)
				.json({ message: StateErrors.STATE_ID_IS_REQUIRED });
		}

		const aState = await state.findOne({
			_id: new ObjectId(id),
		});

		if (!aState) {
			return res
				.status(404)
				.json({ message: StateErrors.NO_STATE_FOUND });
		}

		res.status(200).json(aState);
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const addState = async (req: Request, res: Response) => {
	const { name, shortName, countryId } = req.body;

	try {
		let shortNameUpper = shortName.toString().toUpperCase();

		// check if the state exists in db
		const aState: IState | null = await state.findOne({
			countryId: countryId,
			name: name,
			shortName: shortNameUpper,
		});

		if (aState) {
			return res
				.status(400)
				.json({ message: StateErrors.STATE_ALREADY_EXISTS });
		}

		// create new state document in db
		const newState = new state({
			countryId: countryId,
			name: name.toString(),
			shortName: shortNameUpper,
		});

		await newState.save();

		res.status(200).json({ message: 'State added successfully' });
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

const deleteState = async (req: Request, res: Response) => {
	try {
		const aState = await state.findOneAndDelete({
			_id: new ObjectId(req.params.id),
		});

		if (!aState) {
			res.status(404).json({
				message: StateErrors.NO_STATE_FOUND,
			});
		}

		res.status(204).end();
	} catch (err) {
		res.status(500).json({ type: err });
	}
};

export { addState, getStates, getStatesOfCountry, getState, deleteState };
