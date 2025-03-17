module.exports = {
  apps: [{
    name: 'clio-twitter-bot',
    script: 'src/startScheduler.js',
    watch: false,
    autorestart: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    },
    error_file: 'logs/error.log',
    out_file: 'logs/output.log',
    time: true
  }]
};
