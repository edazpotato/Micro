# Micro Backend

This is primarily being developed by [Minota](https://github.com/xMinota) and [Modded](https://github.com/TheModdedChicken)

Made using:
- [TypeScript](https://github.com/microsoft/typescript)
- [Express](https://expressjs.com)
- [MongoDB](https://www.mongodb.com)

### Developing

Dependencies are managed with [`yarn`](https://yarnpkg.com). Install it with `npm i -g yarn`.

```bash
git clone https://github.com/edazpotato/Micro.git
cd Micro/backend
yarn install  # Install dependencies with yarn
yarn run dev  # Run the server
```
### Envfile

The `epoch` variable in the `.env` file is used for telling the server the date it should use for generating snowflakes (uuids, basically).
It can be today at right now, if needed.
It is formatted in unixtime. You can convert human time to unixtime [here](https://www.vultr.com/resources/unix-time-calculator/)
