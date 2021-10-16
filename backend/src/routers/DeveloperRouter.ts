import server from '../server'

const DeveloperRouter = server.router('/developer', { protocol: 'user' })

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  // TODO
})
