import express from 'express'
import db from './database'
import 'dotenv/config'

const app = express()
new db()

app.listen(process.env.PORT, () => console.log('Listening on port', process.env.PORT))