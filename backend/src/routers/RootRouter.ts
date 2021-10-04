import { Router } from 'express'
import serverArgs from '../'
import { server } from '../classes'
import { getLocalCommitSha } from '../updater'

const RootRouter = server.router("/")

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    message: 'Hello World!'
  })
})

RootRouter.route('/sha').all(async (req, res) => {
  res.status(200).send({data: {sha: await getLocalCommitSha()}})
})

RootRouter.route('/env').all(async (req, res) => {
  res.status(200).send({data: {env: serverArgs.args.find(a => a.arg === "env")?.data[0] || "dev"}})
})

export default RootRouter