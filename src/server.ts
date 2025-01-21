import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import patientRoutes from './routes/patientRoutes';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import diagnosisRoutes from './routes/diagnosisRoutes';
import apppointmentTypeRoutes from './routes/apppointmentTypeRoutes';
import physicianRoutes from './routes/physicianRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import medicalHistoryRoutes from './routes/medicalHistoryRoutes';

dotenv.config();

// connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

app.use(cors());

// API routes
app.use('/api/user', userRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/diagnosis', diagnosisRoutes);
app.use('/api/appointmentType', apppointmentTypeRoutes);
app.use('/api/physician', physicianRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('api/medicalhistory', medicalHistoryRoutes);

// deployment configuration
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
}

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
	);
});
