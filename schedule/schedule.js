const schedule = require('node-schedule');
const chalk = require('chalk');

let rule = new schedule.RecurrenceRule();

rule.minute = 0;
const peorid = 3600000;
const date = new Date();
var dateTime = date.getTime();
let newDate = new Date();
newDate.setTime(dateTime + peorid);

schedule.scheduledJob(newDate, () => {
  console.log(chalk.red('Job start :' + new Date()));
})

