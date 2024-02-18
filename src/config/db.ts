// database connection file to MongoDB
import mongoose, { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI ? process.env.MONGO_URI : '';

console.log('URI:', uri);

const connectDB = async () => {
	try {
		mongoose.set('strictQuery', false);
		await connect(uri);
	} catch (error) {
		console.log(`Error: ${error}`);
		process.exit(1);
	}
};

export default connectDB;
