import { RootRouter } from './routes'

import express from 'express'
import db from './database'
import 'dotenv/config'

const app = express()
new db()

app.use('/', RootRouter)

app.listen(process.env.PORT, () => console.log('Listening on port', process.env.PORT))