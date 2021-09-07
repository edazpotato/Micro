import mongoose from 'mongoose'

export default class Database {
  constructor() {
    console.log(process.env.MONGODB_URI!!)
    if (process.env.MONGODB_URI!! !== "false") {
      mongoose.connect(process.env.MONGODB_URI!!, { // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        family: 4
      })
    }
  }
}
