export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'An unexpected server error occurred.';
  console.error(err);
  res.status(status).json({ error: message });
};
