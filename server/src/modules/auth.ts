import jwt from 'jsonwebtoken';
import config from '../config';
import * as db from '../modules/db_query';
import { Request, Response, NextFunction } from 'express';

const { JWT_SECRET } = config;

export const createToken = (id: string) => {
  return jwt.sign({
    user: id,
  }, <string>JWT_SECRET, {
    expiresIn: '6h',
  });
};

export const isLogin = async (req:Request, res:Response, next:NextFunction) => {
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
    req.params.userId = findUserByEmail[0].id;
    next();
  } catch (e) {
    console.error(e);
    res.status(400).json({ msg: '토큰이 유효하지 않습니다.' });
  }
};