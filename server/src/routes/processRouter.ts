import express, { Request, Response, NextFunction } from 'express';
import { completeKeyword, diffArray, removeTextRow, testRegExp } from '../modules/util';
import { RegExp } from '../type/Enums';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';
import { workingCrawler } from '../modules/crawler';
import company from '../const/company';

const router = express.Router();

/**
 * @route   GET api/process/:keyword
 * @desc    find Company links
 * @access  public
 */
router.get('/:keyword', async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { keyword } = req.params;
    let commonKeyword = testRegExp(RegExp.keyword, keyword) ? completeKeyword(keyword) : null;
    if (commonKeyword) {
      const companyData: any[] = await db.findCompany(commonKeyword);
      if (companyData.length === 0) {
        await initSettingCompany(commonKeyword);
      } else {
        await partialSettingCompany(commonKeyword, companyData);
      }
    } else {
      return res.status(400).json(MESSAGE.validationError);
    }
    const linksData = await db.findAllLinks(commonKeyword);
    res.status(200).json(linksData);
  } catch (e) {
    next(e);
  }
});

const initSettingCompany = async (keyword: string): Promise<void> => {
  const companyId = await db.insertCompany(keyword);
  const crawlData = await workingCrawler([], keyword);
  await db.insertLinks(keyword, companyId, crawlData);
};

const partialSettingCompany = async (keyword: string, companyData: any[]): Promise<void> => {
  const types = await db.findCompanyByTypes(keyword);
  const queryCompany: string[] = removeTextRow(types).map((element: { type: string }) => element.type);
  const crawlData = await workingCrawler(queryCompany, keyword);
  const commonData = removeTextRow(companyData);
  await db.insertLinks(keyword, commonData[0].company_id, crawlData);
};

export default router;