var cron = require('node-cron');
const { copyDirectoryRecursiveSync } = require('./server');

const sourceDir = './test';
const targetDir = './test2';


cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  copyDirectoryRecursiveSync(sourceDir, targetDir);
})