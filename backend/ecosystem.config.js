module.exports = {
  apps : [{
    name: "micro-server-prod",
    script: './dist/index.js',
    watch: './dist/',
    args: "--env test"
  },
  {
    name: "micro-server-dev",
    script: './dist/index.js',
    watch: './dist/'
  }],
};
