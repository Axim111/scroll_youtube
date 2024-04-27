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


// await page.evaluate(() => {
//   window.scrollTo(0, 50000000);
// });

let prevHeight = -1;
let maxScrolls = 100;
let scrollCount = 0;

while (scrollCount < maxScrolls) {
  // Scroll to the bottom of the page
  await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
  // Wait for page load
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Calculate new scroll height and compare
  let newHeight = await page.evaluate('document.documentElement.scrollHeight');
  if (newHeight == prevHeight) {
    break;
  }
  prevHeight = newHeight;
  scrollCount += 1;
}


let items = await page.$$("#video-title > .ytd-video-renderer")
const sleep = () => new Promise((resolve, reject) => {


})


for (let item of items) {
  console.log(await item.evaluate((node) =>
    node
      .innerText))
}
console.log(items.length)
