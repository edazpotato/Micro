import { Router } from 'express'

const RootRouter = Router()

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello World!'
  })
})

export default RootRouter
export const hook = '/'