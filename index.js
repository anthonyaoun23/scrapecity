import { getHTML, getTwitterFollowers } from './lib/scraper';

async function go() {
  const html = await getHTML('https://twitter.com/anthonyaoun23');
  const twitterCount = await getTwitterFollowers(html);

  console.log(`You have ${twitterCount} followers on twitter.`);
}

go();
