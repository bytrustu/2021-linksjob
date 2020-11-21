import db from '../config/mysql_connect';

export const init = async () => {
  try {
    const conn = await db.getConnection();
    try {
      const [row] = await conn.query('select * from User');
      return row;
    } catch (e) {
      console.error(e);
      return e;
    } finally {
      conn.release();
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const transaction = async () => {
  try {
    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      const query: string = 'select * from User';
      const query_list: [] = [];
      const [row] = await conn.query(query, query_list);
      await conn.commit();
      conn.release();
      return row;
    } catch (e) {
      await conn.rollback();
      conn.release();
      console.error(e);
      return false;
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};