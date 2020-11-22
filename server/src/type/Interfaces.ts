export interface IProcessEnv {
  [key: string]: string | undefined
}

export interface IErr extends Error {
  status: number;
  data?: any;
}

export interface IResponseCompany {
  name: string | undefined,
  link: string | undefined,
}

export interface IRegExp {
  [key: string]: RegExp;
}