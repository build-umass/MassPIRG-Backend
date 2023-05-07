import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const accessKeyId = process.env.S3_ACCESS_KEY;
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.S3_REGION;

const s3Client = new aws.S3({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: region
});

export const imageUpload = (req, res, next) => {
  res.status(200).send({ message: 'Image uploaded successfully.', data: req.file.location });
}

const deleteImage = async (name) => {
  const params = {
    Bucket: 'masspirg-test',
    Key: name 
  }
  // return s3.headObject(params).promise().then(() => {
  //   console.log("File Found in S3")
  //   s3.deleteObject(params)
  //   console.log("file deleted Successfully")
  // }, (err) => new Error("File not Found ERROR : " + err.code));
  try
  {
    await s3Client.headObject(params).promise()
    console.log("File Found in S3")
    try
    {
      await s3Client.deleteObject(params).promise()
      console.log("file deleted Successfully")
    }
    catch (err)
    {
      throw new Error("ERROR in file Deleting : " + JSON.stringify(err));
      // console.log("ERROR in file Deleting : " + JSON.stringify(err));
    }
  } catch (err)
  {
    throw new Error("File not Found ERROR : " + err.code);
    // console.log("File not Found ERROR : " + err.code);
  }
}

export const imageDelete = async (req, res, next) => {
  try
  {
    const { name } = req.params;
    await deleteImage(name)
    res.status(200).send({ message: 'Image deleted successfully.'});
  } catch (err)
  {
    res.status(400).send({ message: err.message })
  }
}

