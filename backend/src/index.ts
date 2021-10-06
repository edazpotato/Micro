import 'dotenv/config'

import cors from 'cors'
import db from './database'
import express, { Router } from 'express'
import fs from 'fs'
import path from 'path'
import requestIp from 'request-ip'
import updater, { getLocalCommitSha } from './updater'
import date from 'date-and-time'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { getDataHome } from 'platform-folders'
import { IRouteData, IServerArgs, IRouterOptions, IServerArgument } from './interfaces/server'


const dateFormat = "HH:mm:ss DD/MM/YYYY"
const fileDateFormat = "HH-mm-ss_DD-MM-YYYY"
const serverStartDate = new Date()
const routes: Array<IRouteData> = []
const port = process.env.PORT || 5000
const app = express()
db()


namespace server {
  export async function log (
    message: string, 
    options?: {
      type?: "info" | "warn" | "error" | "client_error", 
      name?: string, 
      exits?: number, 
      error?: Error, 
      logInFile?: boolean
    }
  ) {
    const appDataLoc = path.join(getDataHome(), '/micro-backend')
    const logsDir = path.join(appDataLoc, '/logs')
    const callerLocArr = getCallerPath(1)?.split('\\')
    const callerFile = callerLocArr[callerLocArr.length - 1] || 'unknown'
    const callerName = options?.name
    const type = options?.type || 'info'
    const dateNow = new Date();
    const fullMessage = `[${type.toUpperCase()} | ${
      callerName ? callerName + '/' : ''
    }${callerFile}](${ date.format(dateNow, dateFormat, true) }): ${message}`
  
    console.log(fullMessage)
    if (options?.logInFile === undefined || options?.logInFile === true) {
      if (process.env.LOGS !== 'false') {
        try {
          if (!fs.existsSync(appDataLoc)) fs.mkdirSync(appDataLoc)
          if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)
          const logFileName = date.format(serverStartDate, `[${(await getLocalCommitSha()).slice(0, 7)}] ${fileDateFormat}`, true)

          const logLoc = path.join(
            logsDir, 
            `/${logFileName}.txt`
          );

          await new Promise((res, rej) => {
            fs.appendFile(logLoc, fullMessage + "\n", (err1) => {
              if (err1) console.log(err1)

              if (options?.error) 
                fs.appendFile(logLoc, options.error.message, (err2) => {
                  if (err2) console.log(err2)
      
                  res(null)
                })
              else res(null)
            })
          })
        } catch (e) {
          console.log("Couldn't append to log file\n" + e)
        }
      }
    }
    
    if (options?.exits) process.exit(options.exits)
  }

  export function error (req: express.Request, res: express.Response, errIn: Error) {
    const errStat: number = errIn.message.includes('::') ? (errIn.message.split('::')[0] as unknown) as number : 500
    const errClientMsg = errStat !== 500 ? errIn.message.split('::')[1] : 'internal_server_error'
    const errLogMsg = errStat !== 500 ? errIn.message.split('::')[1] : errIn.message

    server.log(`${errLogMsg} ==> "${req.originalUrl}" from "${req.clientIp}"`, {type: errStat !== 500 ? 'client_error' : 'error'})
    res.status(errStat).json({error: errClientMsg})
  }

  /**
   * Runs a new child process with the specified command
   */
  export async function sh(command: string): Promise<number> {
    const commandArray = command.split(' ')

    return new Promise((res, rej) => {
      spawn(commandArray[0], commandArray.slice(1), { shell: false }).addListener('exit', (code, signal) => {
        if (code !== 0) rej(code)
        else res(code)
      })
    })
  }

  /**
   * Spawns a new process with the specified command
   */
  export async function sp(command: string, detached?: boolean): Promise<ChildProcessWithoutNullStreams> {
    return new Promise((res, rej) => {
      const child = spawn(command, { detached, shell: false })
      child.unref()
      res(child)
    })
  }

  /**
   * Formats and filters process.argv
   */
  export function argv(arga: Array<string>, filter?: Array<string>): IServerArgs {
    const command = arga[0]
    const file = arga[1]
    const staleArgs = arga.slice(2)
    var args: Array<IServerArgument> = []
    var env: Array<string> = []
    var discardLast = false

    for (const arg of staleArgs) {
      if (arg.startsWith('--')) {
        if (discardLast) {
          args.pop()
          discardLast = false
        }

        if (filter?.find(a => a === arg.slice(2)) === undefined) discardLast = true

        args.push({ arg: arg.slice(2), data: [] })
      }
      else if (args.length > 0) args[args.length - 1].data.push(arg)
      else env.push(arg)
    }

    return { command, file, env, args }
  }

  export function router(hook?: string, options?: IRouterOptions) {
    if (!getCallerPath(1).includes('\\Micro\\backend\\src\\routers')) throw new Error('Routers must be located in "backend/src/routers/"')
    const hookOut = hook || "/"
    const protocol = options?.protocol || "*"

    return Object.defineProperties(Router(options), {
      "___hook": {
        value: hookOut
      },
      "___protocol": {
        value: protocol
      }
    });
  }

  export function getCallerPath(depth: number) {
    let stack = new Error().stack?.split('\n') as Array<string>
    return stack[2 + depth].slice(
      stack[2 + depth].lastIndexOf('(') + 1,
      stack[2 + depth].lastIndexOf('.ts') + 3
    )
  }
}

export default server


/* ~Main~ */

app.use((req, res, next) => {
  res.setHeader(
    "X-Powered-By", 
    "Our awsome supporters and open-source contributors!"
  )
  next();
})
app.use(cors({ origin: 'micro.edaz.codes' }));
app.use(express.json())
app.use(requestIp.mw())
app.use((req, res, next) => {
  next()
})


if (process.env.DRL !== 'false') {
  const routers = fs.readdirSync(path.join(__dirname, '/routers'));

  for (const routerName of routers) {
    const routeLocation = './routers/' + routerName;

    import(routeLocation).then(routerE => {
      const router: express.Router = routerE.router || routerE.default;

      if (typeof router === 'function' && (router as any).___hook) {
        const hook: string = (router as any).___hook;

        if (hook) {
          //console.log(router.stack)
          app.use(hook, router)
          server.log(`Hooked router "${routerName}" to endpoint "${hook}"`)
        }
      }
    })
  }
}

app.listen(port, () => server.log(`Listening on port ${port}`))

const argFunc = {
  env: (env: Array<string>) => {
    try {
      const envs = {
        prod: () => setInterval(updater, (env[1] as any) || 600000),
        test: () => setTimeout(() => {
          process.exit(0)
        }, 60000)
      }

      //@ts-ignore
      if (Object.keys(envs).find(e => e === env[0])) envs[env[0]]()
      else throw new Error(`Couldn't find an environment called "${env[0]}"`)
          
      const argsUsed = env.length > 1 ? `using args "${env.slice(1)}` : ""
      server.log(`Running in the "${env[0]}" environment ${argsUsed}"`, {name: "Env"})
    } catch (e) {
      server.log((e as Error).message, {type: "error", exits: 1, name: "Env"})
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
