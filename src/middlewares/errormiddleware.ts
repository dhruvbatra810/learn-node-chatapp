export const handlemiddleware = (err, req, res, next) => {
  console.log("insdie err middleware", err);
  res.status(400).send("Internal Server Error");
};
