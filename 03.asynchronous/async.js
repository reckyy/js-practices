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
          resolve(this.lastID);
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
        resolve(row);
      }
    });
  });
};

console.log("エラーなし");
(async () => {
  await createTable();
  const lastID = await insertValue("books");
  console.log(`自動採番ID : ${lastID}`);
  const row = await getRecord("books");
  console.log(`id:${row.id} タイトル:${row.title}`);
  db.run("drop table books");
})();

await timers.setTimeout(100);

console.log("エラーあり");
(async () => {
  await createTable();
  try {
    const lastID = await insertValue("users");
    console.log(`自動採番ID : ${lastID}`);
  } catch (e) {
    console.error(e);
  }
  try {
    const row = await getRecord("users");
    console.log(`id:${row.id} タイトル:${row.title}`);
  } catch (e) {
    console.error(e);
  }
  db.run("drop table books");
})();

db.close;
