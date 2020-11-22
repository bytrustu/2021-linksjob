import express, { Request, Response, NextFunction } from 'express';
import { testRegExp } from '../modules/util';
import { RegExp } from '../type/Enums';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';
import { workingCrawler } from '../modules/crawler';
import company from '../const/company';
import { insertCompanyAndLinks } from '../modules/db_query';

const router = express.Router();

/**
 * @route   GET api/process/:keyword
 * @desc    find Company links
 * @access  public
 */
router.get('/:keyword', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { keyword } = req.params;
    if (testRegExp(RegExp.keyword, keyword)) {
      const companyData: [] = await db.findCompany(keyword);
      if (companyData.length === 0) {
        const crawlData = await workingCrawler([], keyword);
        await insertCompanyAndLinks(keyword, crawlData);
        return res.status(200).json([]);
      } else {
        const companyData = await db.findAllLinks(keyword);
        return res.status(200).json(companyData);
      }
    }
    res.status(400).json(MESSAGE.validationError);
  } catch (e) {
    next(e);
  }
});

export default router;