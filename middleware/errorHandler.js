const constants = require('../constants')
const errorHandler = (err, req, res, next) =>{
  // If a response already started, let Express handle it
  if (res.headersSent) {
    return next(err);
  }
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({message: err.message, stackTrace: err.stack });
  switch(statusCode){
    case constants.VALIDATION_ERROR:
      res.json({message: err.message, stackTrace: err.stack });
      break;
    case constants.UNAUTHORIZED:
      res.json({message: err.message, stackTrace: err.stack });
      break; 
    case constants.FORBIDDEN:
      res.json({message: err.message, stackTrace: err.stack });
      break;   
    case constants.NOT_FOUND:
      res.json({message: err.message, stackTrace: err.stack });
      break;  
    case constants.SERVER_ERROR:
      res.json({message: err.message, stackTrace: err.stack });
      break;  
  }
}

module.exports = errorHandler;  