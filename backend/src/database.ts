import mongoose from 'mongoose'

export default class Database {
  constructor() {
    if (process.env.MONGODB_URI === undefined || process.env.MONGODB_URI?.includes("mongodb+srv://") !== false) {
      mongoose.connect(process.env.MONGODB_URI!!, { // @ts-ignore
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        family: 4
      })
    }
  }
}
