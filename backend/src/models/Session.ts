import mongoose, { Schema } from 'mongoose'

const SessionSchema: Schema = new Schema({ 
  userId: String,
  ip: String,
  sessionString: String,
  rememberMe: Boolean,
  expiresAt: Date
})

export default mongoose.model('session', SessionSchema)