<<<<<<< HEAD
const { FORBIDDEN_ERROR } = require('./status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
=======
const { FORBIDDEN_ERROR } = require('./status');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
