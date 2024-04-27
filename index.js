import puppeteer from "puppeteer"

const browser = await puppeteer.launch(
  {
    headless: false,
    ignoreHTTPSErrors: true,
    defaultViewport: false,
  })
const page = await browser.newPage();
let link = "https://www.youtube.com/results?search_query=js"
await page.goto(link);

console.log(await page.evaluate('window.innerWidth'))

let prevHeight = -1;
let maxScrolls = 100;
let scrollCount = 0;

while (scrollCount < maxScrolls) {

  await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');

  await new Promise(resolve => setTimeout(resolve, 1000));

  let newHeight = await page.evaluate('document.documentElement.scrollHeight');
  if (newHeight == prevHeight) {
    break;
  }
  prevHeight = newHeight;
  scrollCount += 1;
}

let items = await page.$$("#video-title > .ytd-video-renderer")

for (let item of items) {
  console.log(await item.evaluate((node) =>
    node
      .innerText))
}
console.log(items.length)
