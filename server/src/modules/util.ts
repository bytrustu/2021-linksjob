import { IRankData, IRegExp } from '../type/Interfaces';

export const testRegExp = (type: string, value: string): boolean => {
  const rules: IRegExp = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    keyword: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9||\(\)|\*]{1,20}$/,
    password: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{6,50}$/,
  };
  return rules.hasOwnProperty(type) ?
    rules[type].test(value.replace(/\s/g, '')) : false;
};

export const completeKeyword = (keyword: string): string =>
  keyword
    .replace(/\s/g, '')
    .replace(/\([^>]*\)/g, '')
    .replace(/주식회사/g, '');

export const combineUrl = (origin: string, query: string, keyword: string) =>
  origin + query + encodeURI(keyword);

export const diffArray = (origin: string[], arr: string[]): string[] => {
  const obj = origin.reduce((a: any, c: string) => {
    a[c] = 0;
    return a;
  }, {});
  arr.forEach(v => obj[v] += 1);
  return Object.entries(obj).filter(([_, v]) => v === 0).map(([k, _]) => k);
};

export const removeTextRow = (queryData: any) =>
  JSON.parse(
    JSON.stringify(queryData)
      .replace(/TextRow/g, ''),
  );

export const jsonToTypeDic = (data: any) => {
  const obj: any = {};
  data.forEach((item: any) => {
    if (data[item.type]) {
      data[item.type].push(item);
    } else {
      obj[item.type] = [item];
    }
  });
  return obj;
};

export const compareRank = (rankData: IRankData) => {
  return rankData.now.map((value, index) => {
    const findBeforeIndex = rankData.before.findIndex(item => item.company_id === value.company_id);
    let status = null;
    if (findBeforeIndex === -1 || findBeforeIndex > index) {
      status = 'up';
    } else if (findBeforeIndex === index) {
      status = 'normal';
    } else {
      status = 'down';
    }
    return {
      ...value,
      status
    }
  })
}