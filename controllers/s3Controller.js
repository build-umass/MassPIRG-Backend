export const imageUpload = (req, res, next) => {
  res.status(200).send({ success: true, message: 'Image uploaded successfully.', data: req.file.location });
}

const deleteImage = (name) => {
  const params = {
    Bucket: 'masspirg-test',
    Key: name 
  }
  return s3.headObject(params).promise().then(() => {
    console.log("File Found in S3")
    s3.deleteObject(params)
    console.log("file deleted Successfully")
  }, (err) => new Error("File not Found ERROR : " + err.code));
}

export const imageDelete = async (req, res, next) => {
  try {
    await deleteImage(req.params.name)
    res.status(200).send({ success: true, message: 'Image deleted successfully.'});
  } catch(err) {
    res.status(400).send({success: false, message: err})
  }
}

