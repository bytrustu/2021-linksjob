import { v4 as uuid } from 'uuid';
import puppeteer from 'puppeteer';
import path from 'path';

export default (url: string): string => {
  const filename: string = uuid();
  const screenshotPath = path.join(__dirname + `/../../public/images/screenshot/${filename}.png`);
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--window-size=1920, 1080',
      ],
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1920, height: 1080 });
    await page.waitForTimeout(2000);
    await page.screenshot({ fullPage: true, path: screenshotPath });
    await browser.close();
  })();
  return screenshotPath;
}

