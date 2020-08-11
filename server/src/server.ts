import express from 'express'
import cors from 'cors'
import routes from './routes'
import bodyParser from 'body-parser'

const cosign = require('consign')
const app = express()

app.use(cors({
    origin: '*'
}))

cosign()
    .then('./src/controllers/auth.controller.ts')
    .then('./src/routes.ts')
    .into(app)

app.use(bodyParser.json())
app.use(routes)

app.listen('3333', _ => {
    console.log(`server on in http://localhost:3333`)
})