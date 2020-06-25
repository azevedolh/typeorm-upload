import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const filesDirectory = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: filesDirectory,
  storage: multer.diskStorage({
    destination: filesDirectory,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
