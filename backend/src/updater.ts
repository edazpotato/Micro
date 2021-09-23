import {exec} from 'child_process';
import path from 'path';
import fetch from 'centra'
import server from './classes/server';

/*
  I will be gone for two weeks and I plan to finish this when I get back.
  However, if anyone decides they want to finish this instead then please keep the following in mind:

  - Use pm2(https://pm2.keymetrics.io/) for starting the server
  - Log events with server.log()
  - The VPS is running on Ubuntu but try to keep this multi OS friendly (Windows, MacOS, Linux, <insert more Node friendly operating systems>)
  - Make use of the scripts in package.json when neccessary
  - Use "git pull" for updating, NOT "git clone" (Pretty obvious)
  - Log files are found in your app data folder under "micro-backend/logs"
  - Make sure to only allow the server to update if the backend folder has been modified. It's pretty pointless to update if only frontend changes were pushed
  
    - TheModdedChicken
*/
export default async function updater () {
  const localSha = await getLocalCommitSha();
  const latestSha = await getLatestCommitSha();

  if (latestSha !== localSha) {
    server.log(`Server not up-to-date. Attempting to update ${localSha.slice(0,7)} => ${latestSha.slice(0,7)}`)
    updateServer()
  }
  else server.log("Server is up-to-date", {name: "Updater", type: "info"})
}

export async function updateServer () {
  await server.sh("git reset --hard HEAD");
  await server.sh("git clean -df")
  await server.sh("git pull")
  await server.sh("yarn install")

  await server.sp("yarn run prod")
  process.exit(0)
}

export async function getLatestCommitSha (): Promise<String> {
  const res = await (await fetch("https://api.github.com/repos/edazpotato/micro/commits/main").header("User-Agent", "Micro/1.0").send()).json()
  return res.sha as string
}

export function getLocalCommitSha (): Promise<String> {
  return new Promise((res, rej) => {
    exec(`git --git-dir "${path.join(__dirname, '../../.git')}" rev-parse HEAD`, (err, stdOut, stdErr) => {
      if (err) rej(err);
      if (stdErr) rej(new Error(stdErr.trim()));
      res(stdOut.trim());
    });
  });
}