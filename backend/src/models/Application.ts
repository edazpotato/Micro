import mongoose, { Schema } from 'mongoose'

const ApplicationSchema: Schema = new Schema({ 
  id: String,
  name: String,
  relation: Number,
  flags: [
    "trusted",
    "disabled"
  ],
  callbacks: [String]
})

// DO NOT TOUCH - TheModdedChicken

export default mongoose.model('application', ApplicationSchema)