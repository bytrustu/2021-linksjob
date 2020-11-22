import * as mysql from 'mysql2/promise';
import config from './index';
import { MysqlConfig } from '../type/Types';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = config;

const mysqlConfig: MysqlConfig = {
  host: DB_HOST,
  port: 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  connectionLimit: 100,
  waitForConnections: true,
};

const pool = mysql.createPool(mysqlConfig);

export default (fn:any) => async (...args: any) => {
  const con: any = await pool.getConnection();
  const result = await fn(con, ...args).catch((error: any) => {
    con.connection.release();
    throw error;
  });
  con.connection.release();
  return result;
}