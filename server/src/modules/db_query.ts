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

export const findCompanyIdByLinks = async (companyId: number) => {
  try {
    const SQL: string = `select Company.name, Links.type, Links.url from Company
                          inner join Links
                          on Company.company_id = Links.company_id
                          where Company.company_id = ?
                          order by Links.type asc`;
    const SQL_VALUES: [number] = [companyId];
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

export const insertSearchLog = async (company: string): Promise<void> => {
  try {
    let SQL: string = `insert into SearchLog(company_id)
                        select company_id from Company where name = ?;`;
    const SQL_VALUES: [string] = [company];
    await db.connect(async (con: any) => await con.query(SQL, SQL_VALUES))();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findReltimeSearchLog = async () => {
  try {
    const SQL: string = `select Company.name, Company.company_id from SearchLog
                          inner join Company
                          on SearchLog.company_id = Company.company_id
                          order by SearchLog.log_id desc
                          limit 0, 6;`;
    const SQL_VALUES: string[] = [];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findCompanyRank = async () => {
  const rankData = {
    before: null,
    now: null,
  };
  try {
    const BEFORE_SQL: string = `select T1.company_id, T1.name from (
                                  select SearchLog.company_id, Company.name, count(SearchLog.company_id) as count from SearchLog
                                  inner join Company
                                  on SearchLog.company_id = Company.company_id
                                  where SearchLog.create_date between date_add(now(), interval -2 day) and date_add(now(), interval -1 day)
                                  group by SearchLog.company_id
                                  order by count desc
                                  limit 0, 10
                                ) as T1`;
    const BEFORE_SQL_VALUES: [] = [];
    const SQL: string = `select T1.company_id, T1.name from (
                            select SearchLog.company_id, Company.name, count(SearchLog.company_id) as count from SearchLog
                            inner join Company
                            on SearchLog.company_id = Company.company_id
                            where SearchLog.create_date between date_add(now(), interval -1 day) and now()
                            group by SearchLog.company_id
                            order by count desc
                            limit 0, 10
                          ) as T1`;
    const SQL_VALUES: string[] = [];
    const [beforeRow] = await db.connect((con: any) => con.query(BEFORE_SQL, BEFORE_SQL_VALUES))();
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    rankData.before = beforeRow;
    rankData.now = row;
    return rankData;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const SQL: string = `select id, pw from User where id = ?`;
    const SQL_VALUES: string[] = [email];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

export const registerUser = async (email: string, password:string) => {
  try {
    const SQL: string = `insert into User(id, pw) values(?, ?)`;
    const SQL_VALUES: string[] = [email, password];
    const [row] = await db.connect((con: any) => con.query(SQL, SQL_VALUES))();
    return row.insertId;
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};