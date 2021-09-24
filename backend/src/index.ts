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
app.use(cors({origin: "micro.edaz.codes"})); // Unsafe. We should change this when we go live. External apps like Spica will still be able to use the API fine.
app.use(express.json())
app.use(requestIp.mw())

if (process.env.DRL !== "false") {
    const routes = fs.readdirSync(path.join(__dirname, '/routes'));
    for (const routeName of routes) {
        const routeLocation = "./routes/" + routeName;
        import(routeLocation).then(route => {
            const router: express.Router = route.router || route.default;
            if (typeof router === "function" && router.route) {
                const hook: string = (router as any).hook || route.hook;
                if (hook) try {
                    app.use(hook, router)
                    console.log(`Hooked route "${routeName}" to endpoint "${hook}"`)
                } catch (e) {throw e};   
            }
        })
    }
}

app.listen(port, () => console.log('Listening on port', port))

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
