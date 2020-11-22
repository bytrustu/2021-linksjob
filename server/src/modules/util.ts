export const processRegExp = (type:string, value:string): boolean => {
  enum regexpType {
    email = 'EMAIL',
    password = 'PASSWORD',
    keyword = 'KEYWORD',
  }
  const rules = {
    email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    keyword: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]{1,10}$/,
    password: /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{6,50}$/
  }
  return true;
};

