import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

//Promise用のメソッド作成
const createTable = () => {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)",
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
};

const insertValue = (table_name) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${table_name}(title) VALUES(?)`,
      "テスト",
      function (err) {
        if (err) {
          reject(err);
        } else {
          console.log(`自動採番ID : ${this.lastID}`);
          resolve();
        }
      },
    );
  });
};

const getRecord = (table_name) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM ${table_name} WHERE id = ?`, 1, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`id:${row.id} タイトル:${row.title}`);
        resolve();
      }
    });
  });
};

const dropTable = () => {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

console.log("エラーなし");
createTable()
  .then(() => insertValue("books"))
  .then(() => getRecord("books"))
  .then(() => db.run("DROP TABLE books"));

await timers.setTimeout(100);

console.log("エラーあり");
createTable()
  .then(() => insertValue("users"))
  .catch((err) => console.error(err))
  .then(() => getRecord("users"))
  .catch((err) => console.error(err))
  .then(() => dropTable())
  .then(() => db.close());
