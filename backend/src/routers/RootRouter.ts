import server from '../server'
import { serverArgs } from '..'
import { getLocalCommitSha } from '../updater'

const RootRouter = server.router()

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  })
})

RootRouter.route('/sha').all(server.rAsync(async (req, res) => {
  const sha = await getLocalCommitSha()
  res.status(200).send({
    data: { sha: { full: sha, short: sha.slice(0, 7) } },
  })
}))

RootRouter.route('/env').all(server.rAsync(async (req, res) => {
  res.status(200).send({
    data: {
      env: process.env.environment || 'unknown',
    },
  })
}))

RootRouter.route('/err').all(server.rAsync(async (req, res) => {
  throw new Error('404::error_endpoint_triggered::This error was thrown by the temp err endpoint')
}))

RootRouter.route('/errw').all(server.rAsync(async (req, res) => {
  throw new Error('veryWeirdError')
}))

export default RootRouter
