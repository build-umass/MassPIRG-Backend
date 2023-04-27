import express from 'express';
import { imageUpload } from '../controllers/s3Controller.js';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;

const s3Bucket = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

const upload = multer({
  storage: multerS3({
    s3: s3Bucket,
    bucket: 'masspirg-test',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|HEIC)$/))
      {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, Date.now().toString())
    }
  })
});

const router = express.Router();
router.post('/upload', upload.single('image'), imageUpload)

export default router;