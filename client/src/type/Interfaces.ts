export interface IRegExp {
  [key: string]: RegExp;
}

export interface IRankData {
  [key: string]: string;
}

export interface IRangeParams {
  n: number;
  init?: number;
}

export interface ISearchData {
  [key: string] : {
    name: string,
    type: string,
    url: string,
  }
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IFavorite {
  email: string,
  company: string;
}