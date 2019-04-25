import cron from 'node-cron';
import { runCron } from './scraper';

// http://corntab.com/

cron.schedule('* * * * *', () => {
  console.log('Running the cron!');
  runCron();
});
