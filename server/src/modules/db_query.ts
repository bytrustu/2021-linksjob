import db from '../config/mysql_connect';

export const findCompany = async (keyword: string) => {
  try {
    const SQL: string = 'select * from Company where name = ?';
    const SQL_VALUES: string[] = [keyword];
    const [row] = await db((con: any) => con.query(SQL, SQL_VALUES))();
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
    const [row] = await db((con: any) => con.query(SQL, SQL_VALUES))();
    return row;
  } catch (e) {
    console.error(e);
  }
};