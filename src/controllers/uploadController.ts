import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const STORAGE = process.env.STORAGE || 'gcp';

// ===============================
// LOCAL STORAGE (EC2)
// ===============================
const uploadDir = '/home/ubuntu/uploads/avatars';

if (STORAGE === 'local') {
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}
}

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
});

// ===============================
// Upload handler
// ===============================
const uploadImage = async (file: Express.Multer.File): Promise<string> => {
	if (!file) {
		throw new Error('No file uploaded');
	}

	const timestamp = Date.now();
	const fileName = `${timestamp}-${file.originalname}`;

	// LOCAL STORAGE
	if (STORAGE === 'local') {
		const filePath = path.join(uploadDir, fileName);

		// Ensure buffer is a Uint8Array for TypeScript compatibility
		await fs.promises.writeFile(filePath, new Uint8Array(file.buffer));

		// return relative path (important)
		return `/uploads/avatars/${fileName}`;
	}

	// ===============================
	// GCP (legacy support)
	// ===============================
	const { Storage } = await import('@google-cloud/storage');

	const storage = new Storage({
		keyFilename: path.join(
			__dirname,
			'../config/auris-gcp-service-account.json',
		),
		projectId: process.env.GCP_PROJECT_ID,
	});

	const bucketName = process.env.GCP_BUCKET_NAME;

	if (!bucketName) {
		throw new Error('GCP_BUCKET_NAME missing');
	}

	const bucket = storage.bucket(bucketName);

	return new Promise((resolve, reject) => {
		const fileNameGCP = `avatars/${timestamp}-${file.originalname}`;
		const blob = bucket.file(fileNameGCP);

		const stream = blob.createWriteStream({
			resumable: false,
			metadata: { contentType: file.mimetype },
		});

		stream.on('error', reject);

		stream.on('finish', () => {
			const url = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
			resolve(url);
		});

		stream.end(file.buffer);
	});
};

export { upload, uploadImage };
