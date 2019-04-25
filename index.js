import { getInstagramCount, getTwitterCount } from './lib/scraper';

async function go() {
  const [igCount, twCount] = await Promise.all([
    getInstagramCount(),
    getTwitterCount()
  ]);

  console.log(
    `You have ${twCount} followers on twitter and ${igCount} followers on instagram.`
  );
}

go();
