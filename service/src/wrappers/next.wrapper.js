module.exports = middleware => async (req, res, next) => {
  await middleware(req, res);
  next();
};
