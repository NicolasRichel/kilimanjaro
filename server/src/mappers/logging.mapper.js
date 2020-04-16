module.exports = middleware => async (req, res, next) => {
  console.group( `[ ${new Date().toISOString()} ] >> ${middleware.name}` );
  await middleware(req, res, next);
  console.groupEnd();
  console.log( `[ ${new Date().toISOString()} ] << ${middleware.name}` );
};
