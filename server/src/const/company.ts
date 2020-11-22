import { ICompany } from '../type/Interfaces';

const company: ICompany = {
  wanted: {
    origin: 'https://www.wanted.co.kr',
    query: '/search?query=',
  },
  saramin: {
    origin: 'https://www.saramin.co.kr',
    query: '/zf_user/search/company?searchword=',
  },
  kreditjob: {
    origin: 'https://kreditjob.com',
    query: '',
  },
  jobplanet: {
    origin: 'https://www.jobplanet.co.kr',
    query: '/search?query=',
  },
  rocketpunch: {
    origin: 'https://www.rocketpunch.com',
    query: '/companies?keywords=',
  }
};

export default company;