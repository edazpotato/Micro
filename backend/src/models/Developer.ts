import mongoose, { Schema } from 'mongoose'

const DeveloperSchema: Schema = new Schema({
  id: String,
  key: String,
})

export default mongoose.model('developer', DeveloperSchema)