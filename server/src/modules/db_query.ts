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
    throw new Error(e);
  }
};

export const findAllCompanyLinks = async () => {
  try {
    const SQL: string = `select Company.name, Links.type, Links.url from Company
                          inner join Links
                          on Company.company_id = Links.company_id
                          order by Links.type asc`;
    const SQL_VALUES: [] = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findCompanyLinks = async (companyId: string) => {
  try {
    const SQL: string = `select Company.name, Links.type, Links.url from Company
                          inner join Links
                          on Company.company_id = Links.company_id
                          where Company.company_id = ?
                          order by Links.type asc`;
    const SQL_VALUES: [string] = [companyId];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findCompanyByTypes = async (company: string) => {
  try {
    const SQL: string = `select Links.type from Company
                          inner join Links
                          on Company.company_id = Links.company_id
                          where Company.name = ?
                          group by Links.type
                          order by Links.type asc`;
    const SQL_VALUES: string[] = [company];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findCompanyByLinks = async (company: string) => {
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
    console.error(e);
    throw new Error(e);
  }
};

export const insertCompany = async (keyword: string): Promise<number> => {
  try {
    const SQL: string = `insert into Company(name) values(?)`;
    const SQL_VALUES: string[] = [keyword];
    const [row] = await db.connect(async (con: any) => await con.query(SQL, SQL_VALUES))();
    return row.insertId;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const insertLinks = async (keyword: string, companyId: number, crawlData: ICrawlData): Promise<void> => {
  try {
    let SQL: string = `insert into Links(company_id, type, url)`;
    const SQL_VALUES: (string | number)[] = [];
    let isFirst = true;
    for (const [key, value] of Object.entries(crawlData)) {
      if (value.length > 0) {
        for (const item of value) {
          const { name, link } = item;
          if (keyword === name) {
            SQL += isFirst ? ' values(?, ?, ?)' : ', (?, ?, ?)';
            SQL_VALUES.push(companyId, key, <string>link);
            isFirst = false;
          }
        }
      }
    }
    if (SQL_VALUES.length > 0) {
      await db.connect(async (con: any) => await con.query(SQL, SQL_VALUES))();
    }
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};