'use strict';

/* istanbul ignore next */

function internalError(error, req, res, next) {
  try {
    res.status(500).send(
      {
        code: 500,
        message: `${error}`,
      }
    )
  } catch (err) {
    console.log(`Error inside internalError errHandler :${err}`);
  }
}



module.exports = { internalError };