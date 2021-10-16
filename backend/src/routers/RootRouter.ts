import server from '../server'
import { serverArgs } from '..'
import { getLocalCommitSha } from '../updater'

const RootRouter = server.router()

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    message: 'Hello World!',
  })
})

RootRouter.route('/sha').all(async (req, res) => {
  const sha = await getLocalCommitSha()
  res.status(200).send({
    data: { sha: { full: sha, short: sha.slice(0, 7) } },
  })
})

RootRouter.route('/env').all(async (req, res) => {
  res.status(200).send({
    data: {
      env: serverArgs.args.find((a) => a.arg === 'env')?.data[0] || 'dev',
    },
  })
})

export default RootRouter
