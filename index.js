import express from 'express';
import { getInstagramCount, getTwitterCount } from './lib/scraper';
import db from './lib/db';

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

  db.get('twitter')
    .push({ date: Date.now(), count: twCount })
    .write();

  db.get('instagram')
    .push({ date: Date.now(), count: igCount })
    .write();

  res.json({ igCount, twCount });
});

app.listen(3000, () => {
  console.log(`App running on port 3000`);
});
