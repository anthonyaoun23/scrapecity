import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();

app.get('/scrape', async (req, res, next) => {
  console.log('Scraping!');
  const [igCount, twCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  console.log(
    `You have ${twCount} followers on twitter and ${igCount} followers on instagram!`
  );

  res.json({ igCount, twCount });
});

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
