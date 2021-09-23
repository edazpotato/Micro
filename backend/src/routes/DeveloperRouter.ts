import { Router } from 'express'

const DeveloperRouter = Object.defineProperty(Router(), "hook", {value: "/developer"})

DeveloperRouter.route('/applications/new').post(async (req, res) => {
  
})

//export default DeveloperRouter