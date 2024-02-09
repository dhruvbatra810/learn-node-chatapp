export const uservalidator = async (req, res, next) => {
  try {
    const { name, email, password, pic } = req.body;
    console.log("inside uservalidtor");
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("fields not proper");
    }
    next();
  } catch (error) { next(error)}
};
