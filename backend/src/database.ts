import mongoose from 'mongoose'

export default class Database {
  constructor() {
    mongoose.connect(process.env.MONGODB_URI!!, { // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      family: 4
    })
  }
}
