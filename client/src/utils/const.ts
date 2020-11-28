export const noMatchRegExpKeyword: string = '검색 중 오류가 발생 했습니다.';
export const searchError: string = '오류가 발생했습니다. 다시 시도해주세요.';

type companyObjType = {
  [key: string]: {
    name: string;
    image: string;
    padding: boolean;
  }
}

export const companyObj:companyObjType = {
  jobplanet: {
    name: '잡플래닛',
    image: '/image/jobplanet.png',
    padding: true,
  },
  kreditjob: {
    name: '크레딧잡',
    image: '/image/kreditjob.ico',
    padding: true,
  },
  rocketpunch: {
    name: '로켓펀치',
    image: '/image/rocketpunch.svg',
    padding: true,
  },
  saramin: {
    name: '사람인',
    image: '/image/saramin.ico',
    padding: true,
  },
  wanted: {
    name: '원티드',
    image: '/image/wanted.png',
    padding: false,
  },
};
