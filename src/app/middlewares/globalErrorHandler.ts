import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { TErrorSource } from '../interface/error'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'something went wrong'

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError?.errorSources
    console.log(simplifiedError)
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError?.errorSources
    console.log('ami mongoose validation error')
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError?.errorSources
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError?.errorSources
  } else if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ]
  } else if (error instanceof Error) {
    message = error.message
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ]
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
    // error: message,
  })
}
export default globalErrorHandlers
