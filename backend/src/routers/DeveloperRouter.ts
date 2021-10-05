import { Router } from 'express'
import server from 'src/index'

const DeveloperRouter = server.router("/developer")

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  // TODO
})

//export default DeveloperRouter