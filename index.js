import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';

(async () => {
const browser = await puppeteer.launch({
    headless: false,
});

    const page = await browser.newPage();
    await page.goto("https://www.amazon.com/dp/B09JWGQ2B5/ref=sspa_dk_detail_0");

    await page.screenshot({ path: "image.png" });

    const pageData = await page.evaluate(() => {
        return {
            html: document.documentElement.innerHTML
        };
    });
    const $ = cheerio.load(pageData.html);
    const element = $("#bylineInfo");
    console.log(element.text());

    await browser.close();
})();