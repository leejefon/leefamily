const loopback = require('loopback');
const fs = require('fs');
const program = require('commander');

if (fs.existsSync('./.env')) {
  require('dotenv').load();
}

program
  .option('-t --task [name]', 'Run Task')
  .option('-m --migration [name]', 'Run Migration')
  .parse(process.argv);

const app = module.exports = loopback();

if (program.task) {
  process.env.RUNNING_TASK = true;
  require('./tasks/' + program.task)(app, program);
} else if (program.migration) {
  process.env.RUNNING_MIGRATION = true;
  require('./migration/' + program.migration)(app, program);
} else {
  process.exit(0);
}
