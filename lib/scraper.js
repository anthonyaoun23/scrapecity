import axios from 'axios';
import cheerio from 'cheerio';

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

async function getInstagramFollowers(username = 'mindoftoto') {
  const { data } = await axios.get(
    `https://www.instagram.com/${username}/?__a=1`
  );
  return data;
}

export { getHTML, getTwitterFollowers, getInstagramFollowers };
