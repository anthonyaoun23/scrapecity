import {
  getHTML,
  getTwitterFollowers,
  getInstagramFollowers
} from './lib/scraper';

async function go() {
  const igPromise = getHTML('https://instagram.com/mindoftoto');
  const twPromise = getHTML('https://twitter.com/anthonyaoun23');
  const [igHTML, twHTML] = await Promise.all([igPromise, twPromise]);
  const igCount = await getInstagramFollowers(igHTML);
  const twCount = await getTwitterFollowers(twHTML);

  console.log(
    `You have ${twCount} followers on twitter and ${igCount} followers on instagram.`
  );
}

go();
