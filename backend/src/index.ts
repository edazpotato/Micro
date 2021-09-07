import express from 'express'
import db from './database'
import 'dotenv/config'
import cors from 'cors'
import requestIp from 'request-ip'
import fs from 'fs'
import path from 'path'

const port = process.env.PORT || 5000;
const app = express()
new db()

app.use(cors({origin: "*"}));
app.use(express.json())
app.use(requestIp.mw())

if (process.env.DRL !== "false") {
    const routes = fs.readdirSync(path.join(__dirname, '/routes'));
    for (const routeName of routes) {
        const routeLocation = "./routes/" + routeName;
        import(routeLocation).then(route => {
            if (typeof route.default === "function") {
                try {
                    app.use(route.hook, route.default)
                    console.log(`Hooked route "${routeName}" to endpoint "${route.hook}"`)
                } catch (e) {throw e};
            }
        })
    }
}

app.listen(port, () => console.log('Listening on port', port))
if (process.argv[2] === "--test") {setTimeout(() => {process.exit(0)},60000)}
