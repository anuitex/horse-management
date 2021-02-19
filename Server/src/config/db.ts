import CONFIG from "./config";
import { mockup } from "./is-data-empty";
import pg from "pg";

// export const pool = new pg.Client(CONFIG.DB_LOCALHOST_HOST);
export const pool = new pg.Client(CONFIG.DB_DOCKER_HOST);

export default (async () => {

  try {
    await pool.connect();
    pool.query("CREATE DATABASE horsemanagement", (err: any) => {
      if (err) {
        return console.log("db already created");
      }
      return console.log("db created");
    });

    await pool.query(`
    CREATE TABLE IF NOT EXISTS horses (
      id varchar,
      name varchar,
      dateOfBirth varchar,
      sex int,
      pregnant bool,
      duedate varchar
  );
    `);


    pool.query("SELECT * FROM horses", (error, res) => {
      if (error) {
        console.log("horses table error");
      }
      if (res.rowCount === 0) {
        mockup.forEach((item, index) => {
          pool.query(
            "INSERT INTO horses(id, name, dateofbirth, sex, pregnant, duedate) VALUES ($1, $2, $3, $4, $5,$6)",
            [
              item.id,
              item.name,
              item.dateOfBirth,
              item.sex,
              item.pregnant,
              item.dueDate,
            ],
            (error) => {
              if (error) {
                console.log(error);
              }
              console.log(`Mockup${index + 1} data added`);
            }
          );
        });
      }
    });

    console.log("DB connection OK");
  } catch (e) {
    console.log(e);
    console.log("DB connection bad");
    process.exit();
  }
})();
