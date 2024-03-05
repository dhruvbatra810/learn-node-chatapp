// when using asyn / await , you had to use try catch otherwise , error thrown will not be gone to the error handler middleware
export const uservalidator = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("fields not proper");
    }
    next();
  } catch (error) {
    next(error);
  }
};
