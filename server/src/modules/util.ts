import { IRegExp } from '../type/Interfaces';

export const testRegExp = (type:string, value:string): boolean => {
  const rules:IRegExp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    keyword: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]{1,20}$/,
    password: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{6,50}$/
  }
  return rules.hasOwnProperty(type) ? rules[type].test(value) : false;
};

