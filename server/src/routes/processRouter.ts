import express, { Request, Response, NextFunction } from 'express';
import { completeKeyword, removeTextRow, testRegExp } from '../modules/util';
import { RegExp } from '../type/Enums';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';
import { workingCrawler } from '../modules/crawler';

const router = express.Router();

/**
 * @route   GET api/process/:keyword
 * @param   { string } keyword
 * @return  { number } companyId
 * @desc    crawl company information
 * @access  public
 */
router.get('/:keyword', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { keyword } = req.params;
    const commonKeyword = testRegExp(RegExp.keyword, keyword) ? completeKeyword(keyword) : null;
    let companyId:number;
    if (commonKeyword) {
      const companyData: any[] = await db.findCompany(commonKeyword);
      companyId = companyData.length === 0 ?
        await initSettingCompany(commonKeyword)
        :
        await partialSettingCompany(commonKeyword, companyData);
    } else {
      return res.status(400).json(MESSAGE.validationError);
    }
    res.status(200).json(companyId);
  } catch (e) {
    next(e);
  }
});

const initSettingCompany = async (keyword: string): Promise<number> => {
  const companyId = await db.insertCompany(keyword);
  const crawlData = await workingCrawler([], keyword);
  await db.insertLinks(keyword, companyId, crawlData);
  return companyId;
};

const partialSettingCompany = async (keyword: string, companyData: any[]): Promise<number> => {
  const types = await db.findCompanyByTypes(keyword);
  const queryCompany: string[] = removeTextRow(types).map((element: { type: string }) => element.type);
  const crawlData = await workingCrawler(queryCompany, keyword);
  const commonData = removeTextRow(companyData);
  const companyId = commonData[0].company_id;
  await db.insertLinks(keyword, companyId, crawlData);
  return companyId;
};

export default router;