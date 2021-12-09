import argon2, { argon2id } from 'argon2'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { MUser } from '../models'
import { UniqueID } from 'nodejs-snowflake'
import server from '../server'

const UserRouter = server.router('/users')

const usernameRegex = /^(?:[A-Z]|[a-z]|\d|\.|\_|\-){3,20}$/i
// Retreived from https://www.emailregex.com/ on the 6th of October 2021
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const customEpoch: number | undefined = !process.env.EPOCH ? (process.env.EPOCH as undefined) : +process.env.EPOCH

UserRouter.route('/session')
.post(server.rAsync(async (req, res) => {
  if (req.headers['content-type'] !== 'application/json') throw new Error('415::invalid_content_type')
  if (!req.body) throw new Error('400::body_missing')
  if (!req.clientIp) throw new Error('403::unprocessable_ip')
  if (!req.body.username) throw new Error('400::username_invalid')
  if (!req.body.password) throw new Error('400::password_invalid')

  let user = (await MUser.findOne({
    [req.body.username.includes('@')
      ? 'email'
      : 'username'
    ]: req.body.username.toLowerCase(),
  }).exec()) as any
  if (!user) throw new Error('401::username_invalid')

  let comparison = await argon2.verify(user.password, req.body.password, {
    type: argon2id,
  })
  if (!comparison) throw new Error('401::password_invalid')

  const sessionToken = await initSession(user.id, req.clientIp as string)
  return res.status(200).json({
    message: 'Successfully logged in!',
    data: {
      sessionToken: sessionToken,
      user: {
        username: user.username,
        displayname: user.displayname,
        id: user.id,
        flags: user.flags,
        email: user.email,
        joinedAt: user.joinedAt,
        avatar: user.avatar,
      },
    },
  })
}))
.delete(server.rAsync(async (req, res) => {
  // TODO
}))

UserRouter.route('/signup').post(server.rAsync(async (req, res) => {
  if (req.headers['content-type'] !== 'application/json') throw new Error('415::invalid_content_type')
  if (!req.body) throw new Error('400::body_missing')
  if (!req.clientIp) throw new Error('403::unprocessable_ip')
  if (!req.body.username || !req.body.username.match(usernameRegex)) throw new Error('400::username_invalid')
  if (!req.body.email || !req.body.email.match(emailRegex)) throw new Error('400::email_invalid')
  if (!req.body.password) throw new Error('400::password_missing')
  if (req.body.username.length <= 2) throw new Error('400::username_too_short')

  let emails = await MUser.find({
    email: req.body.email.toLowerCase(),
  }).exec()
  let usernames = await MUser.find({
    username: req.body.username.toLowerCase(),
  }).exec()

  if (usernames.length > 0) throw new Error('403::username_taken')
  if (emails.length > 0) throw new Error('403::email_taken')

  const hashedPassword = await argon2.hash(req.body.password, {
    type: argon2id,
  })
  let user = new MUser({
    username: req.body.username.toLowerCase(),
    displayname: req.body.displayname || req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
    id: new UniqueID({ customEpoch }).getUniqueID() as string,
    joinedAt: new Date(),
  }) as any
  await user.save()

  const sessionToken = await initSession(user.id, req.clientIp as string)
  res.status(200).json({
    message: 'Successfully created your account.',
    data: {
      sessionToken: sessionToken,
      user: {
        displayname: user.displayname,
        username: user.username,
        id: user.id,
        flags: user.flags,
        email: user.email,
        joinedAt: user.joinedAt,
        avatar: user.avatar,
      },
    },
  })
}))

export default UserRouter

async function initSession(
  userId: string, 
  clientIp: string, 
  remeberLogin?: boolean
  ) {
  if (typeof process.env.PRIVATE_KEY === 'string') {
    const sessionToken = jwt.sign(
      { 
        userId, 
        clientIp 
      }, 
      process.env.PRIVATE_KEY, 
      { expiresIn: remeberLogin ? '8m' : '8d' }
    )
    
    await MUser.updateOne({ id: userId }, { $push: { sessions: sessionToken } })
    return sessionToken
  } else throw new Error('500::invalid_private_key')
}
