import server from '../server'
import { MDeveloper } from '../models'

const DeveloperRouter = server.router('/dev')

DeveloperRouter.route('/app/new').post(async (req, res) => {
  // TODO
})

//export default DeveloperRouter