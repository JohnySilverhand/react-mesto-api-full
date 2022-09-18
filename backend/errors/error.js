<<<<<<< HEAD
const { NOT_FOUND } = require('./status');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
}

module.exports = NotFound;
=======
const { NOT_FOUND } = require('./status');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
}

module.exports = NotFound;
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
