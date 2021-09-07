import mongoose, { Schema } from 'mongoose'

const UserSchema: Schema = new Schema({ 
  username: String,
  displayname: String,
  flags: [
    "admin",
    "moderator",
    "trusted",
    "supporter",
    "supporter_p",
    "disabled",
    "banned"
  ],
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  id: String,
  joinedAt: Date,
  avatar: String || null,
})

export default mongoose.model('user', UserSchema)