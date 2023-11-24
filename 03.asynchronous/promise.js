import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

//Promise用のメソッド作成
const createTable = () => {
  return new Promise((resolve, reject) => {
    db.run(
      "create table books(id integer primary key autoincrement, title text unique)",
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
      `insert into ${table_name}(title) values(?)`,
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
    db.get(`select * from ${table_name} where id = ?`, 1, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`id:${row.id} タイトル:${row.title}`);
        resolve();
      }
    });
  });
};

console.log("エラーなし");
createTable()
  .then(() => insertValue("books"))
  .then(() => getRecord("books"))
  .then(() => db.run("drop table books"));

await timers.setTimeout(100);

console.log("エラーあり");
createTable()
  .then(() => insertValue("users"))
  .catch((err) => console.log(err))
  .then(() => getRecord("users"))
  .catch((err) => console.log(err))
  .then(() => db.run("drop table books"));

db.close;
