import * as db from '../config/mysql_connect';
import { ICrawlData } from '../type/Interfaces';

export const findCompany = async (keyword: string) => {
  try {
    const SQL: string = 'select * from Company where name = ?';
    const SQL_VALUES: string[] = [keyword];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
  }
};

export const findAllLinks = async (company: string) => {
  try {
    const SQL: string = `select Company.name, Links.type, Links.url from Company
                            inner join Links
                            on Company.company_id = Links.company_id
                            where Company.name = ?
                            order by Links.type asc`;
    const SQL_VALUES: string[] = [company];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    throw new Error(e);
  }
};

export const insertCompanyAndLinks = async (keyword: string, crawlData: ICrawlData): Promise<void> => {
  try {
    await db.transction(async (con: any) => {
      const COMPANY_SQL: string = `insert into Company(name) values(?)`;
      const COMPANY_SQL_VALUES: string[] = [keyword];
      const [row] = await con.query(COMPANY_SQL, COMPANY_SQL_VALUES);

      let LINKS_SQL: string = `insert into Links(company_id, type, url)`;
      const LINKS_SQL_VALUES: string[] = [];
      let isFirst = true;
      for (const [key, value] of Object.entries(crawlData)) {
        if (value.length > 0) {
          for (const item of value) {
            const { name, link } = item;
            if (keyword === name) {
              LINKS_SQL += isFirst ? ' values(?, ?, ?)' : ', (?, ?, ?)';
              LINKS_SQL_VALUES.push(row.insertId, key, <string>link);
              isFirst = false;
            }
          }
        }
      }
      if (LINKS_SQL_VALUES.length > 0) {
        await con.query(LINKS_SQL, LINKS_SQL_VALUES);
      }
    })();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};