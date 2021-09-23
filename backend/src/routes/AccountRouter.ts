import { Router } from 'express'
import argon2, { argon2id } from 'argon2'
import crypto from 'crypto'
import { UserModel, SessionModel } from '../models'
import { UniqueID } from 'nodejs-snowflake'
import server from '../classes/server'

const AccountRouter = Object.defineProperty(Router(), "hook", {value: "/accounts"})

const usernameRegex = /^[a-z0-9]+$/i
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const customEpoch: number | undefined = !process.env.EPOCH ? process.env.EPOCH as undefined : +process.env.EPOCH

AccountRouter.route('/login').post(async (req, res) => {
  try {
    let errors: Array<String> = []

    if (req.headers['content-type'] !== "application/json") return server.error(res, 415, ["client::invalid_content_type"])
    if (!req.body) return server.error(res, 400, ["client::body_missing"])
    if (!req.clientIp) return server.error(res, 500, ["server::non-linkable_ip"])
    if (!req.body.username) return errors.push('client::username_invalid')
    if (!req.body.password) return errors.push('client::password_invalid')
    if (errors.length > 0) return server.error(res, 400, errors)
  
    let user = await UserModel.findOne({
      [req.body.username.includes('@')
        ? 'lowercaseEmail'
        : 'lowercaseName']: req.body.username.toLowerCase()
    }).exec() as any
    if (!user) errors.push('client::user_invalid')
  
    let comparison = await argon2.verify((user as any).password, req.body.password, { 
      type: argon2id,
    })
    if (!comparison) return server.error(res, 401, ["client::password_invalid"])
  
    const sessionToken = await initSession((user as any).id, req.clientIp as string);
    return res.status(200).json({
      message: 'Successfully logged in!',
      sessionToken: (sessionToken as any).token, 
      user: {
        username: user.username,
        displayname: user.displayname,
        id: user.id,
        flags: user.flags,
        email: user.email,
        joinedAt: user.joinedAt,
        avatar: user.avatar
      }
    })
  } catch (err) {server.error(res, 500, ["server::internal_error"])}
})

AccountRouter.route('/register').post(async (req, res) => {
  try {
    let errors: Array<String> = []

    if (req.headers['content-type'] !== "application/json") return server.error(res, 415, ["client::invalid_content_type"])
    if (!req.body) return server.error(res, 400, ["client::body_missing"])
    if (!req.clientIp) return server.error(res, 500, ["server::non-linkable_ip"])
    if (!req.body.username) errors.push('client::username_missing')
    if (!req.body.email) errors.push('client::email_missing')
    if (!req.body.password) errors.push('client::password_missing')
    if (!req.body.username.match(usernameRegex)) errors.push('client::username_not_alphanumeric')
    if (!req.body.email.match(emailRegex)) errors.push('client::email_invalid')
    if (req.body.username.length <= 2) errors.push('client::username_too_short')
  
    let emails = await UserModel.find({
      email: req.body.email.toLowerCase(),
    }).exec()
    let usernames = await UserModel.find({
      name: req.body.username.toLowerCase(),
    }).exec()
  
    if (usernames.length > 0) errors.push('client::username_taken')
    if (emails.length > 0) errors.push('client::email_taken')
    if (errors.length > 0) return server.error(res, 400, errors)
  
    const hashedPassword = await argon2.hash(req.body.password, {
      type: argon2id,
    })
    let user = new UserModel({
      username: req.body.username.toLowerCase(),
      displayname: req.body.displayname || req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: hashedPassword,
      id: new UniqueID({ customEpoch }).getUniqueID() as string,
      joinedAt: new Date(),
    })

    var test: string = (user as any)
    test.match("1")
  
    await user.save()
  
    const sessionToken = await initSession(user.id, req.clientIp as string);
    res.status(200).json({
      message: 'Successfully created your account.', // @ts-ignore
      sessionToken: sessionToken.token,
      user: { // @ts-ignore
        displayname: user.displayname, // @ts-ignore
        username: user.username, // @ts-ignore
        id: user.id, // @ts-ignore
        flags: user.flags, // @ts-ignore
        email: user.email, // @ts-ignore
        joinedAt: user.joinedAt, // @ts-ignore,
        avatar: user.avatar
      }
    })
  } catch (err) {server.error(res, 500, ["server::internal_error"])}
})

export default AccountRouter

async function initSession (userId: string, clientIp: string) {
  const sessionToken = 'Bearer ' + crypto.randomBytes(96).toString('base64')
  let session = new SessionModel({
    token: sessionToken,
    userId,
    ip: clientIp
  })
  await session.save()
  return session;
}