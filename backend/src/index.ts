import 'dotenv/config'

import cors from 'cors'
import date from 'date-and-time'
import db from './database'
import express from 'express'
import fs from 'fs'
import path from 'path'
import requestIp from 'request-ip'
import updater from './updater'
import { IRouteData, IServerArgs } from './interfaces'
import server from './server'

server.cRequire()

const routes: Array<IRouteData> = []
const port = process.env.PORT || 5000
const app = express();
db();

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

  const rawRouter = require(routeLocation)
  const router: express.Router = rawRouter.router || rawRouter.default

  if (typeof router === 'function' && (router as any).___hook) {
    const hook: string = (router as any).___hook

    if (hook) {
      app.use(hook, router)
      server.log(`Hooked router "${routerName}" ==> "${hook}"`)
    }
  }
}

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  server.error(req, res, err)
})

app.listen(port, () => server.log(`Listening on port ${port}`))

// Functions processed by the server for arguments
const argFunc = {
  // Set server environment
  env: (env: Array<string>) => {
    try {
      const envs = {
        prod: () => {},
        test: () => {
          process.env.timeToLive = '30000';
        },
      }

      //@ts-ignore
      if (Object.keys(envs).find((e) => e === env[0])) envs[env[0]]()
      else throw new Error(`Couldn't find an environment called "${env[0]}"`)

      const argsUsed = env.length > 1 ? `using args "${env.slice(1)}"` : ''
      server.log(`Running in the "${env[0]}" environment ${argsUsed}`, {
        name: 'env',
      })
      process.env.environment = env[0];
    } catch (e) {
      server.log((e as Error).message, {
        type: 'server_error',
        exits: 1,
        name: 'env',
      })
    }
  },

  // Toggle auto updates
  autoUpdate: (env: Array<string>) => {
    if (env[0] !== "false") {
      const state: number = +env[0] || 300000;
      setInterval(updater, state)
      server.log(`"autoUpdate" has been set to ${state} milliseconds`, { name: 'autoUpdate' })
    } else server.log(`"autoUpdate" has been set to false`, { name: 'autoUpdate' });
    process.env.autoUpdate = env[0];
  },
  get au() { return this.autoUpdate },

  // Set the time the server will stay online in milliseconds
  timeToLive: (env: Array<string>) => {
    process.env.timeToLive = env[0];
  },
  get ttl() { return this.timeToLive },

  // Toggle timestamp logging
  timestamps: (env: Array<string>) => {
    if (env[0] === "false") {
      process.env.timestamps = "false";
      server.log('"timestamps" has been set to false', { name: 'timestamps' })
    }
  },
  get ts() { return this.timestamps },

  logs: async (env: Array<string>) => {
    process.env.LOGS = "true"
    server.log(`Currently logging to "${await server.getLogFile()}.txt"`, { logInFile: false })
  }
}
export const serverArgs: IServerArgs = server.argv(process.argv, Object.keys(argFunc))

const timestampsArg = serverArgs.args.find(a => ['timestamps', 'ts'].includes(a.arg));
if (timestampsArg) argFunc['timestamps'](timestampsArg.data);
for (const arg of serverArgs.args) {
  //@ts-ignore
  argFunc[arg.arg](arg.data)
}

if (process.env.timeToLive) {
  const TTL: number = +process.env.timeToLive || 60000;

  setTimeout(() => {
    process.exit(0)
  }, TTL)
  server.log(`"Time to Live" has been set to ${TTL} milliseconds`, { name: 'timeToLive' })
}

process.once('exit', () => server.log(`Server stopped at ${date.format(new Date(), server.dateFormat, true)}`))