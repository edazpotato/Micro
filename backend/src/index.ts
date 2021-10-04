import express from 'express'
import db from './database'
import 'dotenv/config'
import cors from 'cors'
import requestIp from 'request-ip'
import fs from 'fs'
import path from 'path'
import updater from './updater'
import { server } from './classes'

const port = process.env.PORT || 5000;
const app = express()
new db()

app.use((req, res, next) => {
    res.setHeader("X-Powered-By", "Our awsome supporters and open-source contributors!");
    next();
})
app.use(cors({origin: "micro.edaz.codes"}));
app.use(express.json())
app.use(requestIp.mw())

if (process.env.DRL !== "false") {
    const routers = fs.readdirSync(path.join(__dirname, '/routers'));
    for (const routerName of routers) {
        const routeLocation = "./routers/" + routerName;
        import(routeLocation).then(routerE => {
            const router: express.Router = routerE.router || routerE.default;
            if (typeof router === "function" && (router as any).___hook) {
                const hook: string = (router as any).___hook;
                if (hook) try {
                    app.use(hook, router)
                    server.log(`Hooked router "${routerName}" to endpoint "${hook}"`)
                } catch (e) {throw e};   
            }
        })
    }
}

app.listen(port, () => server.log(`Listening on port ${port}`))

const argFunc = {
    env: (env: string) => {
        try {
            const envs = {
                prod: () => setInterval(updater, 150000),
                test: () => setTimeout(() => {process.exit(0)},60000)
            }

            //@ts-ignore
            if (Object.keys(envs).find(e => e === env)) envs[env]();
            else throw new Error(`Couldn't find an environment called "${env}"`);
            
            if (env === "test") server.log(`Running in the "${env}" environment`, {name: "Env"})
            server.log(`Running in the "${env}" environment`, {name: "Env"})
        } catch (e) {
            server.log((e as Error).message, {type: "error", exits: 1, name: "Env"})
        }
    }
}
const serverArgs = server.argv(process.argv, Object.keys(argFunc))
/* Do NOT use the "--env prod" argument when running in a local dev environment. 
This will overwrite any changes made to your local clone every five minutes if it finds a new commit on main. */

for (const arg of serverArgs.args) { //@ts-ignore
    argFunc[arg.arg](...arg.data)
}
