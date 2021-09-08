import { Router } from 'express'

const RootRouter = Object.defineProperty(Router(), "hook", {value: "/"})

RootRouter.route('/').all((req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hello World!'
  })
})

export default RootRouter