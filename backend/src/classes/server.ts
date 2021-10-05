import { ChildProcessWithoutNullStreams, exec, spawn } from 'child_process'
import express, { Router } from 'express'

import date from 'date-and-time'
import fs from 'fs'
import { getDataHome } from 'platform-folders'
import { getLocalCommitSha } from '../updater'
import path from 'path'

const dateFormat = 'HH:mm:ss DD/MM/YYYY'
const fileDateFormat = 'HH-mm-ss_DD-MM-YYYY'
const serverStartDate = new Date()

namespace server {
  export async function log(
    message: string,
    options?: {
      type?: 'info' | 'warn' | 'error'
      name?: string
      exits?: number
      error?: Error
      logInFile?: boolean
    }
  ) {
    const appDataLoc = path.join(getDataHome(), `/micro-backend`)
    const logsDir = path.join(appDataLoc, '/logs')
    const callerLocArr = getCallerPath(1)?.split('\\')
    const callerFile = callerLocArr[callerLocArr.length - 1] || 'unknown'
    const callerName = options?.name
    const type = options?.type || 'info'
    const dateNow = new Date()
    const fullMessage = `[${type.toUpperCase()} | ${
      callerName ? callerName + '/' : ''
    }${callerFile}](${date.format(dateNow, `${dateFormat}`, true)}): ${message}`

    console.log(fullMessage)
    if (options?.logInFile === undefined || options?.logInFile === true) {
      if (process.env.LOGS !== 'false') {
        try {
          if (!fs.existsSync(appDataLoc)) fs.mkdirSync(appDataLoc)
          if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir)
          const logLoc = path.join(
            logsDir,
            `/${date.format(
              serverStartDate,
              `[${(await getLocalCommitSha()).slice(0, 7)}] ${fileDateFormat}`,
              true
            )}.txt`
          )
          await new Promise((res, rej) => {
            fs.appendFile(logLoc, fullMessage + '\n', (err) => {
              if (err) console.log(err)

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
    res: express.Response,
    status: number,
    errIn: string | Error
  ) {
    const err = (errIn as any).message ? (errIn as any).message : errIn

    server.log(err, { type: 'error' })
    res
      .status(status)
      .json({ error: status !== 500 ? err : 'internal_server_error' })
  }

  /**
   * Runs a new child process with the specified command
   */
  export async function sh(command: string): Promise<string> {
    return new Promise((res, rej) => {
      exec(command, (err, stdOut, stdErr) => {
        if (err) rej(err)
        if (stdErr) rej(new Error(stdErr.trim()))
        res(stdOut.trim())
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
      const child = spawn(command, { detached })
      child.unref()
      res(child)
    })
  }

  /**
   * Formats and filters process.argv
   */
  export function argv(
    argvs: Array<string>,
    filter?: Array<string>
  ): ServerArgs {
    const command = argvs[0]
    const file = argvs[1]
    const staleArgs = argvs.slice(2)
    var args: Array<ServerArgument> = []
    var env: Array<string> = []
    var discardLast = false

    for (const arg of staleArgs) {
      if (arg.startsWith('--')) {
        if (discardLast) {
          args.pop()
          discardLast = false
        }
        if (filter?.find((a) => a === arg.slice(2)) === undefined)
          discardLast = true
        args.push({ arg: arg.slice(2), data: [] })
      } else if (args.length > 0) args[args.length - 1].data.push(arg)
      else env.push(arg)
    }

    return { command, file, env, args }
  }

  export function router(hook?: string, options?: RouteOptions) {
    return Object.defineProperty(Router(options), '___hook', {
      value: hook || '/',
    })
  }
}

export default server

function getCallerPath(depth: number) {
  let stack = new Error().stack?.split('\n') as Array<string>
  return stack[2 + depth].slice(
    stack[2 + depth].lastIndexOf('(') + 1,
    stack[2 + depth].lastIndexOf('.ts') + 3
  )
}

interface ServerArgs {
  command: string
  file: string
  env: Array<string>
  args: Array<ServerArgument>
}

interface ServerArgument {
  arg: string
  data: Array<string>
}

interface RouteOptions {
  /**
   * Enable case sensitivity.
   */
  caseSensitive?: boolean

  /**
   * Preserve the req.params values from the parent router.
   * If the parent and the child have conflicting param names, the child’s value take precedence.
   *
   * @default false
   * @since 4.5.0
   */
  mergeParams?: boolean

  /**
   * Enable strict routing.
   */
  strict?: boolean
}
