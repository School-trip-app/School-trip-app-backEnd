'use strict';


function notFound(req, res, next) {
  try {
    res.status(404).send(
      {
        code: 404,
        message: 'Page Not Found'
      }
    )
  } catch (err) {
    next(`Error inside notFound errHandler :${err}`);
  }
}



module.exports = { notFound };