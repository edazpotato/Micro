import express, { Router } from 'express'
import db from './database'
import 'dotenv/config'
import cors from 'cors'
import requestIp from 'request-ip'
import fs from 'fs'
import path from 'path'

const app = express()
new db()

app.use(cors({origin: "*"}));
app.use(express.json())
app.use(requestIp.mw())

const routes = fs.readdirSync(path.join(__dirname, '/routes'));
for (const routeName of routes) {
    const routeLocation = "./routes/" + routeName;
    import(routeLocation).then(route => {
        if (typeof route.default === "function") {
            try {
                app.use(route.endpoint || "/", route.default)
                console.log(`Loaded route "${routeName}" on endpoint "${route.endpoint}"`)
            } catch (e) {throw e};
        }
    });
}

app.listen(process.env.PORT, () => console.log('Listening on port', process.env.PORT))