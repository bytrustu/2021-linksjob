import express, { Request, Response, NextFunction } from 'express';
import * as db from '../modules/db_query';
import MESSAGE from '../const/message';

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

export default router;