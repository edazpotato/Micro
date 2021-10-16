import 'dotenv/config'

import cors from 'cors'
import db from './database'
import express from 'express'
import fs from 'fs'
import path from 'path'
import requestIp from 'request-ip'
import updater from './updater'
import { IRouteData } from './interfaces/server'
import server from './server'

const routes: Array<IRouteData> = []
const port = process.env.PORT || 5000
const app = express()
db()
use()

async function use () {
  app.use((req, res, next) => {
    res.setHeader(
      'X-Powered-By',
      'Our awsome supporters and open-source contributors!'
    )
    next()
  })
  app.use(cors({ origin: 'micro.edaz.codes' }))
  app.use(express.json())
  app.use(requestIp.mw())
  
  const routers = fs.readdirSync(path.join(__dirname, '/routers'))
  
  for (const routerName of routers) {
    const routeLocation = './routers/' + routerName
  
    await import(routeLocation).then((routerE) => {
      const router: express.Router = routerE.router || routerE.default
  
      if (typeof router === 'function' && (router as any).___hook) {
        const hook: string = (router as any).___hook
  
        if (hook) {
          //console.log(router.stack)
          app.use(hook, router)
          server.log(`Hooked router "${routerName}" to endpoint "${hook}"`)
        }
      }
    })
  }

  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('testout')
    server.error(req, res, err)
  })
  app.listen(port, () => server.log(`Listening on port ${port}`))
}

const argFunc = {
  env: (env: Array<string>) => {
    try {
      const envs = {
        prod: () => setInterval(updater, (env[1] as any) || 600000),
        test: () =>
          setTimeout(() => {
            process.exit(0)
          }, 60000),
      }

      //@ts-ignore
      if (Object.keys(envs).find((e) => e === env[0])) envs[env[0]]()
      else throw new Error(`Couldn't find an environment called "${env[0]}"`)

      const argsUsed = env.length > 1 ? `using args "${env.slice(1)}"` : ''
      server.log(`Running in the "${env[0]}" environment ${argsUsed}`, {
        name: 'Env',
      })
    } catch (e) {
      server.log((e as Error).message, {
        type: 'server_error',
        exits: 1,
        name: 'Env',
      })
    }
  },
}
export const serverArgs = server.argv(process.argv, Object.keys(argFunc))
/* Do NOT use the "--env prod" argument when running in a local dev environment. 
This will overwrite any changes made to your local clone every five minutes if it finds a new commit on main. */

for (const arg of serverArgs.args) {
  //@ts-ignore
  argFunc[arg.arg](arg.data)
}
