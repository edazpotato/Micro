module.exports = {
  apps: [
    {
      name: "micro-server-prod",
      script: './dist/index.js',
      watch: './dist/',
      args: "--env prod --au --logs"
    },
    {
      name: "micro-server-dev",
      script: './dist/index.js',
      watch: './dist/',
      args: '--logs'
    },
  ],
};
