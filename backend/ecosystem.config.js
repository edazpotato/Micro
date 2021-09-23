module.exports = {
  apps : [{
    name: "micro-server-prod",
    script: './dist/index.js',
    watch: './dist/',
    args: "--prod"
  },
  {
    name: "micro-server-dev",
    script: './dist/index.js',
    watch: './dist/'
  }],
};
