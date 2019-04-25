import express from 'express';
import cors from 'cors';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';
import './lib/cron';

const app = express();
app.use(cors());

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

app.get('/data', async (req, res, next) => {
  // get scraped data
  const data = db.value();
  // respond with json
  res.json(data);
});

app.listen(3001, () => {
  console.log(`App running on port 3000`);
});
