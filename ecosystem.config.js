module.exports = {
  apps : [{
    name: 'dovepay-freight',
    script: './express.js',
    watch: '.',
    ignore_watch: ["[\/\\]\./", "node_modules"],
    env: {
       NODE_ENV: "development"
    },
    env_production: {
       NODE_ENV: "production"
    },
    // pm2 start process.json --env production
    instances: 0,
    exec_mode: "cluster"
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
};
