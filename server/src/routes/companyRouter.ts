import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';
import { compareRank, completeKeyword, jsonToTypeDic, removeTextRow, testRegExp } from '../modules/util';
import { RegExp } from '../type/Enums';
import { ICrawlData, IRankData } from '../type/Interfaces';
import jwt from 'jsonwebtoken';
import { isLogin } from '../modules/auth';

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
 * @route   GET api/comapny/search/rank
 * @return  { } rankData
 * @desc    get company rank
 * @access  public
 */
router.get('/rank', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rankData = await db.findCompanyRank();
    const commonData = compareRank(removeTextRow(rankData));
    res.status(200).json(commonData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * @route   GET api/company/favorite
 * @desc    get favorite companys
 * @access  private
 */
router.get('/favorite', isLogin, async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  try {
    const favoriteData = await db.findFavoritesByEmail(userId);
    const commonData: { name: string, link?: any }[] = removeTextRow(favoriteData);
    const addLinksData = await addCompanyByLinks(commonData);
    res.status(200).json(addLinksData);
  } catch (e) {
    console.error(e);
    throw new Error();
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
      return res.status(400).send({ error: MESSAGE.paramError });
    }
    const companyData = await db.findCompanyIdByLinks(parseInt(companyId, 10));
    res.status(200).json(companyData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * @route   POST api/company/favorite
 * @return  { {name:string}[] } favoriteData
 * @desc    add favorite company
 * @access  private
 */
router.post('/favorite/:company', isLogin, async (req: Request, res: Response, next: NextFunction) => {
  const { userId, company } = req.params;
  try {
    const insertId: number = await db.insertFavorite(userId, company);
    const favoriteData = await db.findFavoriteById(insertId);
    const commonData: { name: string, link?: any }[] = removeTextRow(favoriteData);
    const addLinksData = await addCompanyByLinks(commonData);
    res.status(200).json(addLinksData);
  } catch (e) {
    console.error(e);
    throw new Error();
  }
});

/**
 * @route   DELETE api/company/favorite
 * @return  { string } company
 * @desc    remove favorite company
 * @access  private
 */
router.delete('/favorite/:company', isLogin, async (req: Request, res: Response, next: NextFunction) => {
  const { userId, company } = req.params;
  try {
    await db.removeFavorite(userId, company);
    res.status(200).json(company);
  } catch (e) {
    console.error(e);
    throw new Error();
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
    let companyId: number;
    if (commonKeyword) {
      const companyData: any[] = await db.findCompany(commonKeyword);
      if (companyData.length === 0) {
        return res.status(200).json();
      }
      const companyByLinks = await db.findCompanyByLinks(commonKeyword);
      const commonData = jsonToTypeDic(removeTextRow(companyByLinks));
      await db.insertSearchLog(commonKeyword);
      return res.status(200).json(commonData);
    } else {
      return res.status(400).send({ error: MESSAGE.validationError });
    }
  } catch (e) {
    next(e);
  }
});

/**
 * @route   GET api/comapny/realtime/keyword
 * @return  { } keywordData
 * @desc    get realtime search keyword
 * @access  public
 */
router.get('/realtime/keyword', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const keywordData = await db.findReltimeSearchLog();
    res.status(200).json(keywordData);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

const addCompanyByLinks = async (commonData: {name:string, link?: any[]}[]) => {
  if (commonData.length > 0) {
    const companyNames = commonData.map(element => element.name);
    let index = 0;
    for (const company of companyNames) {
      const links = await db.findCompanyByLinks(company);
      commonData[index] = { ...commonData[index], link: links };
      index++;
    }
  }
  return commonData;
}

export default router;