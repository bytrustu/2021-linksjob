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
  type?: string | undefined,
}

export interface IRegExp {
  [key: string]: RegExp;
}

export interface IMessage {
  [key: string]: string;
}

export interface ICompany {
  [key: string]: {
    origin: string,
    query: string
  }
}

export interface IProcessCrawler {
  [key: string]: object
}

export interface ICrawlData {
  [key: string]: IResponseCompany[]
}

export interface IRankData {
  [key: string]: {
    company_id: number,
    name: string,
  }[]
}