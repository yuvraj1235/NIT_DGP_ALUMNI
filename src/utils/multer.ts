import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const uploadMiddleware = upload.single('file');