<<<<<<< HEAD
const { CONFLICT_ERROR } = require('./status');

class ConflictedError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_ERROR;
  }
}

module.exports = ConflictedError;
=======
const { CONFLICT_ERROR } = require('./status');

class ConflictedError extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_ERROR;
  }
}

module.exports = ConflictedError;
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
