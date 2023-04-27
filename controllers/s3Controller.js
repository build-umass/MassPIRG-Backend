export const imageUpload = (req, res, next) => {
  res.status(200).send({ success: true, message: 'Image uploaded successfully.' });
}