import { Router } from 'express'
import argon2, { argon2id } from 'argon2'
import crypto from 'crypto'
import User from '../models/User'
import Session from '../models/Session'
import { UniqueID } from 'nodejs-snowflake'

const AccountRouter = Router()

const usernameRegex = /^[a-z0-9]+$/i
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const customEpoch: number | undefined = !process.env.EPOCH ? process.env.EPOCH as undefined : +process.env.EPOCH

AccountRouter.route('/login').post(async (req, res) => {
  let errors: Array<String> = []

  if (!req.body) return errors.push('Invalid body')
  if (!req.body.username) return errors.push('Invalid username')
  if (!req.body.password) return errors.push('Invalid password')
  if (!req.clientIp) errors.push("Failed to register client ip with session")
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'errors',
      errors
    })
  }

  let user = await User.findOne({
    [req.body.username.includes('@')
      ? 'lowercaseEmail'
      : 'lowercaseName']: req.body.username.toLowerCase()
  }).exec()
  if (!user) errors.push('Invalid user') // @ts-ignore

  let comparison = await argon2.verify(user.password, req.body.password, { 
    type: argon2id,
  })
  if (!comparison) {
    return res.status(400).json({
      success: false,
      message: 'errors',
      errors: ['Invalid username/password'],
    })
  }

  // @ts-ignore
  const sessionToken = await initSession(user.id, req.clientIp as string);
  return res.status(200).json({
    success: true,
    message: 'Successfully logged in!', // @ts-ignore
    sessionToken: sessionToken.token,
    user: { // @ts-ignore
      username: user.username, // @ts-ignore
      id: user.id, // @ts-ignore
      flags: user.flags, // @ts-ignore
      email: user.email, // @ts-ignore
      joinedAt: user.joinedAt, // @ts-ignore,
      avatar: user.avatar
    }
  })
})

AccountRouter.route('/register').post(async (req, res) => {
  try {
    let errors: Array<String> = []

    if (!req.body) errors.push('No body')
    if (!req.body.username) errors.push('You must supply a username')
    if (!req.body.email) errors.push('You must supply a email')
    if (!req.body.password) errors.push('You must supply a password')
    if (!req.body.username.match(usernameRegex)) errors.push('Your username must be alphanumeric')
    if (!req.body.email.match(emailRegex)) errors.push('Your email is invalid')
    if (req.body.username.length <= 2) errors.push('Your username\'s too short.')
    if (!req.clientIp) errors.push("Failed to register client ip with session")

    let emails = await User.find({
      email: req.body.email,
    }).exec()
    let usernames = await User.find({
      name: req.body.username,
    }).exec()

    if (usernames.length > 0) errors.push('This username is already in use')
    if (emails.length > 0) errors.push('This email is already in use')
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'errors',
        errors
      })
    }
    const hashedPassword = await argon2.hash(req.body.password, {
      type: argon2id,
    })
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      id: new UniqueID({ customEpoch }).getUniqueID() as string,
      joinedAt: new Date(),
    })

    await user.save()

    const sessionToken = await initSession(user.id, req.clientIp as string);
    res.status(200).json({
      success: true,
      message: 'Successfully created your account.', // @ts-ignore
      sessionToken: sessionToken.token,
      user: { // @ts-ignore
        username: user.username, // @ts-ignore
        id: user.id, // @ts-ignore
        flags: user.flags, // @ts-ignore
        email: user.email, // @ts-ignore
        joinedAt: user.joinedAt, // @ts-ignore,
        avatar: user.avatar
      }
    })
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      errors: e
    })
  }
})

async function initSession (userId: string, clientIp: string) {
  const sessionToken = 'Bearer ' + crypto.randomBytes(96).toString('base64')
  let session = new Session({
    token: sessionToken,
    userId,
    ip: clientIp
  })
  await session.save()
  return session;
}

export default AccountRouter
export const hook = '/account'