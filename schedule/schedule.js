const schedule = require('node-schedule');
const chalk = require('chalk');
const crawler = require('../crawler/crawler');

let rule = new schedule.RecurrenceRule();

// rule.minute = 0;
const peorid = 360;
const date = new Date();
var dateTime = date.getTime();
let newDate = new Date();
newDate.setTime(dateTime + peorid);

schedule.scheduleJob(newDate, () => {
  console.log(chalk.red('Job start :' + new Date()));
  crawler.execute();
})

