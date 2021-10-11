import mongoose, { Schema } from 'mongoose'

const ApplicationSchema: Schema = new Schema({
  id: String,
  name: String,
  relation: Number,
  flags: ['trusted', 'disabled'],
  callbacks: [String],
})

export default mongoose.model('application', ApplicationSchema)
