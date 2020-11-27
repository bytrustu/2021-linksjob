import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as db from '../modules/db_query';
import { testRegExp } from '../modules/util';
import { createToken } from '../modules/auth';
import config from '../config';

const router = express.Router();
const { JWT_SECRET } = config;

/**
 * @route   POST api/user
 * @desc    register user
 * @access  public
 */
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!testRegExp('email', email) || !testRegExp('password', password)) {
      return res.status(400).send({ msg: '비밀번호 형식이 올바르지 않습니다.' });
    }

    const findUserByEmail = await db.findUserByEmail(email);
    if (findUserByEmail.length > 0) {
      return res.status(403).send({ msg: '이미 사용중인 아이디 입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.registerUser(email, hashedPassword);
    const userData = await db.findUserByEmail(email);
    const token = createToken(userData[0].id);
    res.status(200).json({ token, user: userData[0].id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

/**
 * @route   POST api/user
 * @desc    login user
 * @access  public
 */
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!testRegExp('email', email) || !testRegExp('password', password)) {
      return res.status(400).json({ msg: '이메일, 비밀번호 형식이 올바르지 않습니다.' });
    }

    const userData = await db.findUserByEmail(email);
    if (userData.length === 0) {
      return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }

    const isMatch = await bcrypt.compare(password, userData[0].pw);
    if (!isMatch) {
      return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다.' });
    }
    const token = createToken(userData[0].id);
    res.status(200).json({ token, user: userData[0].id });
  } catch (e) {
    console.error(e);
    next(e);
  }
});


/**
 * @route   POST api/user/auth
 * @desc    auth user
 * @access  public
 */
// @ts-ignore
router.get('/auth', async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: '토큰이 없음. 인증이 거부됨.' });
  }
  try {
    const decoded: any = jwt.verify(token, <string>JWT_SECRET);
    const findUserByEmail: any = await db.findUserByEmail(decoded.user);
    if (findUserByEmail.length === 0) {
      return res.status(403).json({ msg: '유저가 존재하지 않습니다.' });
    }
    res.status(200).json(findUserByEmail[0].id);
  } catch (e) {
    console.error(e);
    res.status(400).json({ msg: '토큰이 유효하지 않습니다.' });
  }
});

export default router;