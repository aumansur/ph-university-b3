import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors'

import globalErrorHandlers from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'

// parser

app.use(express.json())
app.use(cors())

// http://localhost:5000/api/v1/students/create-student
// application routes
app.use('/api/v1/', router)
const test = async (req: Request, res: Response) => {
  res.send('Welcome to the server!')
}
app.get('/', test), app.use(globalErrorHandlers)
// not found
app.use(notFound)

export default app
