const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);
  const statusCode = err.statusCode || err.status || 500;
  return res.status(statusCode).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'An unexpected error occurred on the server.'
  });
};

module.exports = errorHandler;
