import { Router } from 'express'
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

export default RootRouter