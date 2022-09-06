let config = {
  apps : [{
    name: 'dovepay-freight',
    script: './express',
    // watch: '.',
    // ignore_watch: ["[\/\\]\./", "node_modules"],
    env_production: {
       NODE_ENV: "production"
    },
    env_development: {
       NODE_ENV: "development"
    },
    autorestart: false,
    // pm2 start process.json --env production
    // instances: 0,
    // exec_mode: "cluster"
  }]

  // ,deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
}


module.exports = config