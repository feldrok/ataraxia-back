import 'dotenv/config.js'
import './config/db.js'

import { __dirname } from './utils.js'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js'
import express from 'express'
import indexRouter from './routes/index.js'
import logger from 'morgan'
import { notFoundHandler } from './middlewares/notFoundHandler.js'
import path from 'path'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', indexRouter)
app.use(notFoundHandler)
app.use(errorHandler)

export default app
