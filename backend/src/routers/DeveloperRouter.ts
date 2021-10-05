import { server } from '../classes'

const DeveloperRouter = server.router('/developer')

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  // TODO
})

//export default DeveloperRouter
