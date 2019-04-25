import express from 'express';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import { getInstagramCount, getTwitterCount } from './lib/scraper';

// Setup the DB
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

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
