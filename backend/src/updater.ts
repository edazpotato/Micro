import { exec } from 'child_process'
import fetch from 'centra'
import path from 'path'
import server from './server'

export default async function updater() {
  const localSha = await getLocalCommitSha()
  const latestCommit = await getLatestCommit()

  var missingUpdate = false
  if (latestCommit.sha !== localSha) {
    for (const file of latestCommit.files) {
      if (file.filename.split('/')[0] === 'backend') missingUpdate = true
    }
  }

  if (missingUpdate) {
    server.log(`Server not up-to-date. Attempting to update ${localSha.slice(0,7)} => ${latestCommit.sha.slice(0, 7)}`)
    updateServer()
  } else server.log('Server is up-to-date', { name: 'Updater', type: 'info' })
}

export async function updateServer() {
  await server.sh('git reset --hard HEAD')
  await server.sh('git clean -df')
  await server.sh('git pull')
  await server.sh('yarn install')

  await server.sp('yarn run prod')
  process.exit(0)
}

export async function getLatestCommit() {
  return (
    await fetch('https://api.github.com/repos/edazpotato/micro/commits/main')
      .header('User-Agent', 'Micro/1.0')
      .send()
  ).json()
}

export async function getLatestCommitSha(): Promise<string> {
  const res = await getLatestCommit();
  return res.sha as string
}

export function getLocalCommitSha(): Promise<string> {
  return new Promise((res, rej) => {
    exec(
      `git --git-dir "${path.join(__dirname, '../../.git')}" rev-parse HEAD`,
      (err, stdOut, stdErr) => {
        if (err) rej(err)
        if (stdErr) rej(new Error(stdErr.trim()))
        res(stdOut.trim())
      }
    )
  })
}
