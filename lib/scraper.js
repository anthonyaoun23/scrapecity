import axios from 'axios';
import cheerio from 'cheerio';
import db from './db';

async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

async function getTwitterFollowers(html) {
  // load up cheerio
  const $ = cheerio.load(html);
  const span = $('[data-nav="followers"] .ProfileNav-value');
  return span.data('count');
}

async function getInstagramFollowers(html) {
  // load up Cheerio
  const $ = cheerio.load(html);
  const dataInString = $('script[type="application/ld+json"]').html();
  const pageObject = JSON.parse(dataInString);
  return parseInt(
    pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
  );
}

async function getInstagramCount() {
  const igHTML = await getHTML('https://instagram.com/mindoftoto');
  const igCount = await getInstagramFollowers(igHTML);
  return igCount;
}

async function getTwitterCount() {
  const twHTML = await getHTML('https://twitter.com/anthonyaoun23');
  const twCount = await getTwitterFollowers(twHTML);
  return twCount;
}

async function runCron() {
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

  console.log('Done saving to db!');
}

export { getInstagramCount, getTwitterCount, runCron };
