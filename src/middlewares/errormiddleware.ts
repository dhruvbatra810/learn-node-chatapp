export const handlemiddleware = (err, req, res, next) => {
  console.log("insdie err middleware", err.message);
  res.status(400).send( err.message);
};
