import mongoose, { Schema } from 'mongoose'

const UserSchema: Schema = new Schema({ 
  username: String, 
  flags: Object,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  lowercaseEmail: String,
  lowercaseName: String,
  //verificationToken: {
  //  type: String,
  //  required: true
  //},
  //emailVerified: Boolean,
  joinedAt: Date,
  avatar: String,
})

export default mongoose.model('user', UserSchema)