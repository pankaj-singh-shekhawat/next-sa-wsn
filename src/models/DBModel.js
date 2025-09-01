import mysql from 'mysql2';

class Database {
  constructor(DBobj) {
    this.pool = mysql.createPool(DBobj).promise();
  }

  async getQueries(query, params = [], connection = null) {
    const resp = {
      error: false,
      message: "",
      data: []
    };

    try {
      const conn = connection || this.pool;
      const [rows] = await conn.query(query, params);
      resp.data = rows;
    } catch (err) {
      console.error("Error in fetching data:", err);
      resp.error = true;
      resp.message = "Error occurred while fetching data.";
    }

    return resp;
  }

  async postQueries(query, params = [], connection = null) {
    const resp = {
      error: false,
      message: "",
      result : ""
    };

    try {
      const conn = connection || this.pool;
      const [result] = await conn.query(query, params);
      resp.result = result;  //use it to extract "insertId" such as result.insertId
    } catch (err) {
      console.error("Error in posting data:", err);
      resp.error = true;
      resp.message = "Error occurred while posting data.";
    }
    return resp;
  }
}

export default Database;