import { Router } from 'express'
import { server } from '../classes'

const DeveloperRouter = server.router("/developer")

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  
})

//export default DeveloperRouter