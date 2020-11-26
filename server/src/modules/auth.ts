import jwt from 'jsonwebtoken';
import config from '../config';

const { JWT_SECRET } = config;

export const createToken = (id: string) => {
  return jwt.sign({
    user: id,
  }, <string>JWT_SECRET, {
    expiresIn: '6h',
  });
};
