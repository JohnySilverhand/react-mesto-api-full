<<<<<<< HEAD
const { UNAUTHORIZED_ERROR } = require('./status');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
=======
const { UNAUTHORIZED_ERROR } = require('./status');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
