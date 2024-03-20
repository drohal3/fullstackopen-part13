const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  // logger.error(error.message)
  console.log("==> ERROR!")
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: 'Sequelize Error' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: 'Sequelize Validation Error' })
  }

  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint
}