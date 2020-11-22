import { v4 as uuid } from 'uuid';
import cheerio from 'cheerio';
import puppeteer, { WrapElementHandle } from 'puppeteer';
import axios from 'axios';
import path from 'path';
import { ICompany, IProcessCrawler, IResponseCompany } from '../type/Interfaces';
import company from '../const/company';
import { combineUrl, diffArray } from '../modules/util';

export const workingCrawler = async (companyNames: string[], keyword: string): Promise<boolean> => {
  try {
    const originCompanyNames = Object.keys(company);
    const diff = diffArray(originCompanyNames, companyNames);
    if (diff.length === 0) {
      return true;
    }

    let index = 0;
    for (const item of diff) {
      console.log(`🔥 start crawler(${++index}/${diff.length}) : ${item} ( keyword: ${keyword} )`);
      const fn:any = processCrawler[item];
      const data:ICompany[] = await fn(keyword);
      console.log(data);
    }

    return true;
  } catch (e) {
    throw new Error(e);
  }
};

export const processWanted = async (keyword: string): Promise<IResponseCompany[]> => {
  const { origin, query } = company.wanted;
  const url = combineUrl(origin, query, keyword);
  const data: IResponseCompany[] = [];

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });
  const names: WrapElementHandle<(string | null)[]> = await page
    .$$eval('.slick-slide.slick-active.slick-current > div > a > button',
      (anchors) => anchors.map((button) => (button as HTMLButtonElement).getAttribute('data-company-name')));
  if (names.length > 0) {
    const links: string[] = await page.$$eval('.slick-slide.slick-active.slick-current > div > a',
      (anchors) => anchors.map((link) => (link as HTMLLinkElement).href));
    names.forEach((name, index) => {
      data.push({ name: name || '', link: links[index] });
    });
  }
  await browser.close();
  return data;
};

export const processSaramin = async (keyword: string): Promise<IResponseCompany[]> => {
  const { origin, query } = company.saramin;
  const url = combineUrl(origin, query, keyword);
  const response = await axios.get(url);
  let $ = cheerio.load(response.data);
  const data: IResponseCompany[] = [];
  $('#company_info_list > .content > .item_corp > .corp_name > a')
    .each((i, element) => {
      data.push({
        name: $(element).attr('title'),
        link: origin + $(element).attr('href'),
      });
    });
  return data;
};

export const processKreditjob = async (keyword: string): Promise<IResponseCompany[]> => {
  const { origin } = company.kreditjob;
  const data: IResponseCompany[] = [];
  const companyData: IResponseCompany = {
    name: '',
    link: '',
  };
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(origin, {
    waitUntil: 'load',
    timeout: 0,
  });
  await page.click('input.search-query');
  await page.keyboard.type(keyword);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(2000);
  companyData.link = await page.url();
  if (companyData.link !== origin) {
    companyData.name = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('title');
    }, '.company-name');
    data.push(companyData);
  }
  await browser.close();
  return data;
};

export const processJobplanet = async (keyword: string): Promise<IResponseCompany[]> => {
  const { origin, query } = company.jobplanet;
  const url = combineUrl(origin, query, keyword);
  const response = await axios.get(url);
  let $ = cheerio.load(response.data);
  const data: IResponseCompany[] = [];
  $('.is_company_card > .result_card  > a')
    .each((i, element) => {
      data.push({
        name: $(element).text(),
        link: origin + $(element).attr('href'),
      });
    });
  return data;
};

export const processRocketpunch = async (keyword: string): Promise<IResponseCompany[]> => {
  const { origin, query } = company.rocketpunch;
  const url = combineUrl(origin, query, keyword);
  const data: IResponseCompany[] = [];

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });
  await page.waitForTimeout(1000);
  const names: WrapElementHandle<(string | null)[]> = await page
    .$$eval('.company.item a > h4.header.name > strong',
      (anchors) => anchors.map((element) => (element as HTMLElement).innerHTML));
  if (names.length > 0) {
    const links: string[] = await page.$$eval('#company-list .company.item a.link',
      (anchors) => anchors.map((link) => (link as HTMLLinkElement).href));
    names.forEach((name, index) => {
      data.push({ name: name || '', link: links[index] });
    });
  }
  await browser.close();
  return data;
};

export const screenShot = async (url: string): Promise<string> => {
  const filename: string = uuid();
  const screenshotPath: string = path.join(__dirname + `/../../public/images/screenshot/${filename}.png`);
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--window-size=1920, 1080',
    ],
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 0,
  });
  await page.setViewport({ width: 1920, height: 1080 });
  await page.waitForTimeout(2000);
  await page.screenshot({ fullPage: true, path: screenshotPath });
  await browser.close();
  return screenshotPath;
};

export const processCrawler: IProcessCrawler = {
  wanted: processWanted,
  saramin: processSaramin,
  kreditjob: processKreditjob,
  jobplanet: processJobplanet,
  rocketpunch: processRocketpunch,
};