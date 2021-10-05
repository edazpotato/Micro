import { Router } from 'express'
import { getLocalCommitSha } from '../updater'

const RootRouter = Object.defineProperty(Router(), "hook", {value: "/"})

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    message: 'Hello World!'
  })
})

RootRouter.route('/sha').all(async (req, res) => {
  const sha = await getLocalCommitSha();
  res.status(200).send({
    data: { sha: { full: sha, short: sha.slice(0, 7) } },
  });
})

export default RootRouter