const {SECRET} = require("./config");
const jwt = require("jsonwebtoken");
const { Session } = require("../models")
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
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).send({ error: [error.message] })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.token = authorization.substring(7)
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    // return res.status(401).json({ error: 'token missing' })
  }

  if (req.token) {
    const session = await Session.findOne({
      where: {token: req.token}
    })


    if (!session) {
      return res.status(401).json({ error: 'session expired' })
    }
  }

  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}