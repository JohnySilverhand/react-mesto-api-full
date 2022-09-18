<<<<<<< HEAD
const { ERROR_CODE } = require('./status');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = ERROR_CODE;
  }
}

module.exports = BadRequest;
=======
const { ERROR_CODE } = require('./status');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = ERROR_CODE;
  }
}

module.exports = BadRequest;
>>>>>>> 97da421253f9a79b35334e14902ab34ec9ffb303
