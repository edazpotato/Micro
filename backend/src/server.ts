import express, { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { getLocalCommitSha } from './updater'
import date from 'date-and-time'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { getDataHome } from 'platform-folders'
import {
  IServerArgs,
  IRouterOptions,
  IServerArgument,
} from './interfaces/server'

const serverStartDate = new Date()

namespace server {
  export const dateFormat = 'HH:mm:ss DD/MM/YYYY'
  export const fileDateFormat = 'HH-mm-ss_DD-MM-YYYY'

  export async function log(
    message: string,
    options?: {
      type?: 'info' | 'warn' | 'server_error' | 'req_error'
      name?: string
      exits?: number
      error?: Error
      logInFile?: boolean
    }
  ) {
    const appDataLoc = path.join(getDataHome(), '/micro-backend')
    const logsDir = path.join(appDataLoc, '/logs')
    const callerLocArr = getCallerPath(1)?.split('/')
    const callerFile = callerLocArr[callerLocArr.length - 1] || 'unknown'
    const callerName = options?.name
    const type = options?.type || 'info'
    const dateNow = new Date()
    const fullMessage = `[${type.toUpperCase()} | ${
      callerName ? callerName + '@' : ''
    }${callerFile}]${
      process.env.timestamps === "false" ? '' : `(${date.format(dateNow, dateFormat, true)})`
    }: ${message}`

    console.log(fullMessage)
    if (options?.logInFile === undefined || options?.logInFile === true) {
      if (process.env.LOGS !== 'false') {
        try {
          if (!fs.existsSync(appDataLoc)) fs.mkdirSync(appDataLoc)
          if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)
          const logFileName = date.format(
            serverStartDate,
            `[${(await getLocalCommitSha()).slice(0, 7)}] ${fileDateFormat}`,
            true
          )

          const logLoc = path.join(logsDir, `/${logFileName}.txt`)

          await new Promise((res, rej) => {
            fs.appendFile(logLoc, fullMessage + '\n', (err1) => {
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

  export function error(
    req: express.Request,
    res: express.Response,
    errIn: Error
  ) {
    const errStat: number = errIn.message.includes('::') ? ((errIn.message.split('::')[0] as unknown) as number) : 500
    const errClientMsg = errStat !== 500 ? errIn.message.split('::')[1] : 'internal_server_error'
    const errLogMsg = errStat !== 500 ? errIn.message.split('::')[1] : errIn.message

    server.log(`${errLogMsg} ==> "${req.originalUrl}" from "${req.clientIp}"`, {
      type: errStat !== 500 ? 'req_error' : 'server_error',
    })
    res.status(errStat).json({ error: errClientMsg })
  }

  /**
   * Runs a new child process with the specified command
   */
  export async function sh(command: string): Promise<number> {
    const commandArray = command.split(' ')

    return new Promise((res, rej) => {
      spawn(commandArray[0], commandArray.slice(1), {
        shell: false,
      }).addListener('exit', (code, signal) => {
        if (code !== 0) rej(code)
        else res(code)
      })
    })
  }

  /**
   * Spawns a new process with the specified command
   */
  export async function sp(
    command: string,
    detached?: boolean
  ): Promise<ChildProcessWithoutNullStreams> {
    return new Promise((res, rej) => {
      const child = spawn(command, { detached, shell: false })
      child.unref()
      res(child)
    })
  }

  /**
   * Formats and filters process.argv
   */
  export function argv(
    arga: Array<string>,
    filter?: Array<string>
  ): IServerArgs {
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

        if (filter?.find((a) => a === arg.slice(2)) === undefined) discardLast = true

        args.push({ arg: arg.slice(2), data: [] })
      } 
      else if (args.length > 0) args[args.length - 1].data.push(arg)
      else env.push(arg)
    }

    return { command, file, env, args }
  }

  export function router(hook?: string, options?: IRouterOptions) {
    const hookOut = hook || '/'
    const protocol = options?.protocol || '*'

    return Object.defineProperties(Router(options), {
      ___hook: {
        value: hookOut,
      },
      ___protocol: {
        value: protocol,
      },
    })
  }

  export function getCallerPath(depth: number): string {
    let stack = new Error().stack?.split('\n') as Array<string>
    return stack[2 + depth].slice(
      stack[2 + depth].lastIndexOf('(') + 1,
      stack[2 + depth].lastIndexOf(__filename.includes(".js") ? '.js' : '.ts') + 3
    ).replace(/\\/gi, '/')
  }

  /**
   * Handle asynchronous routes
   */
  export function rAsync (route: (req: express.Request, res: express.Response, next?: express.NextFunction) => {}) {
    function out(req: express.Request, res: express.Response, next: express.NextFunction) {
      try { route(req, res, next) } catch (err: any) {
        console.log('test')
        next(err)
      }
    }
    return out
  }
}

export default server