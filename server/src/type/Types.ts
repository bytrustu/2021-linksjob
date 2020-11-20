export type MysqlConfig = {
  host: string | undefined;
  port: number;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  connectionLimit: number;
  waitForConnections: boolean;
}