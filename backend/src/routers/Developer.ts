import server from '..'

const DeveloperRouter = server.router('/developer', { protocol: 'user' })

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  // TODO
})

//export default DeveloperRouter