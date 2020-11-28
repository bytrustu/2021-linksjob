interface IConfig {
  [key: string]: string
}

const config:IConfig = {
  LOCAL_URL: 'http://localhost:9000',
  SERVER_URL: 'http://linksjob.me:9000'
};

export default config;