export interface IProcessEnv {
  [key: string]: string | undefined
}

export interface IErr extends Error {
  status: number;
  data?: any;
}