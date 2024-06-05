import app from './app'
import config from './app/config'
import mongoose from 'mongoose'
import { Server as HttpServer } from 'http'

let server: HttpServer

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
main()
process.on('unhandledRejection', () => {
  console.log(`🫥 Unhandled rejection is detected , shutting down....`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
})

process.on('uncaughtException', () => {
  console.log(`🫥 uncaughtException is detected , shutting down....`)
  process.exit(1)
})
