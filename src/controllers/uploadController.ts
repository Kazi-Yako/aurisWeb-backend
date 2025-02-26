import { Storage } from '@google-cloud/storage';
import multer from 'multer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
// Initialize Google Cloud Storage
const storage = new Storage({
	keyFilename: path.join(
		__dirname,
		'../config/auris-gcp-service-account.json'
	),
	projectId: process.env.GCP_PROJECT_ID,
});

const bucketName = process.env.GCP_BUCKET_NAME;

console.log('Bucket Name:', bucketName);

if (!bucketName) {
	throw new Error('GCP_BUCKET_NAME is not defined in environment variables');
}

const bucket = storage.bucket(bucketName);

// Multer storage configuration
const upload = multer({
	storage: multer.memoryStorage(), // Store in memory before uploading
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload file to GCP
const uploadImageToGCP = async (file: Express.Multer.File): Promise<string> => {
	return new Promise((resolve, reject) => {
		try {
			if (!file) {
				console.error('Upload Error: No file provided');
				return reject(new Error('No file uploaded'));
			}

			const { originalname, mimetype, buffer } = file;
			const timestamp = Date.now();
			const fileName = `avatars/${timestamp}-${originalname}`;
			const blob = bucket.file(fileName);

			console.log(`Uploading file: ${fileName}`);

			const blobStream = blob.createWriteStream({
				resumable: false,
				metadata: { contentType: mimetype },
			});

			blobStream.on('error', (error) => {
				console.error('GCP Upload Error:', error);
				reject(new Error(`Failed to upload to GCP: ${error.message}`));
			});

			blobStream.on('finish', () => {
				const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
				console.log(`File uploaded successfully: ${publicUrl}`);
				resolve(publicUrl);
			});

			blobStream.end(buffer);
		} catch (error: any) {
			console.error('Unexpected Error in uploadImageToGCP:', error);
			reject(new Error(`Unexpected error: ${error.message}`));
		}
	});
};

// Express route
export { upload, uploadImageToGCP };
