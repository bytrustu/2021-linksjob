import { IRangeParams } from '../type/Interfaces';
import { IRegExp } from '../type/Interfaces';

// @ts-ignore
export const range: number[] = (n: number, init = 0): IRangeParams => [...(Array(n).keys())].map((_, i) => i + init);

export const testRegExp = (type: string, value: string): boolean => {
  const rules: IRegExp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    keyword: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9||\(\)|\*]{1,20}$/,
    password: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{6,50}$/,
  };
  return rules.hasOwnProperty(type) ?
    rules[type].test(value.replace(/\s/g, '')) : false;
};

export const isEmptyObject = (obj: any) => JSON.stringify(obj) === '{}';

export const uniqueTypeArray = (arr: any[]): any[] => {
  // @ts-ignore
  const types = [...new Set([...arr.map(element => element.type)])];
  const links = types.map(element => {
    const index = arr.findIndex(item => item.type === element);
    return arr[index];
  })
  return links;
};