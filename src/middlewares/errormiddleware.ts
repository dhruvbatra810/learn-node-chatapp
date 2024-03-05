export const handlemiddleware = (err, req, res) => {
  res.status(400).send(err.message);
};
