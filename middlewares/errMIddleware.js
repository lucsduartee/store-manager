const errMiddleware = async (err, _req, res, _next) => {
  if (err.message) {
    return res.status(err.code).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Error 500' });
};

module.exports = errMiddleware;
