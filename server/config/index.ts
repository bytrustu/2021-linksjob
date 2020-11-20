import * as dotenv from 'dotenv';

dotenv.config();

interface IConfigGroup {
  PORT: string | undefined,
}

console.log(process.env.PORT);

const config: IConfigGroup = {
  PORT: process.env.PORT,
};

export default config;