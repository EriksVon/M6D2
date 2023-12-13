export const checkAuth = (req, res, next) => {
  if (req.headers.authorization === "password corretta") {
    next();
  } else {
    res.status(401).json({
      error: "password errata",
    });
  }
};
