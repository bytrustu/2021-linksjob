import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';
import { completeKeyword, jsonToTypeDic, removeTextRow, testRegExp } from '../modules/util';
import { RegExp } from '../type/Enums';
import { ICrawlData } from '../type/Interfaces';

const router = express.Router();

/**
 * @route   GET api/comapny
 * @return  { ICrawlData } companyData
 * @desc    get company links
 * @access  public
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyData = await db.findAllCompanyLinks();
    res.status(200).json(companyData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * @route   GET api/comapny/:companyId
 * @param   { number } companyId
 * @return  { ICrawlData } companyData
 * @desc    get company links by companyId
 * @access  public
 */
router.get('/:companyId', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyId } = req.params;
    if (!companyId) {
      return res.status(400).send(MESSAGE.paramError);
    }
    const companyData = await db.findCompanyLinks(companyId);
    res.status(200).json(companyData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * @route   GET api/company/search/:keyword
 * @param   { string } keyword
 * @return  { ICrawlData } companyId
 * @desc    search company information
 * @access  public
 */
router.get('/search/:keyword', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { keyword } = req.params;
    const commonKeyword = testRegExp(RegExp.keyword, keyword) ? completeKeyword(keyword) : null;
    let companyId:number;
    if (commonKeyword) {
      const companyData: any[] = await db.findCompany(commonKeyword);
      if (companyData.length === 0) {
        return res.status(200).json();
      }
      const companyByLinks = await db.findCompanyByLinks(commonKeyword);
      const commonData = jsonToTypeDic(removeTextRow(companyByLinks));
      return res.status(200).json(commonData);
    } else {
      return res.status(400).send({error: MESSAGE.validationError});
    }
  } catch (e) {
    next(e);
  }
});

export default router;