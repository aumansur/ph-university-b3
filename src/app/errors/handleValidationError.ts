import mongoose from 'mongoose'
import { TErrorSource, TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(error.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val.path,
        message: val?.message,
      }
    },
  )

  const statusCode = 400
  {
    return {
      statusCode,
      message: ' validation error',
      errorSources,
    }
  }
}

export default handleValidationError
