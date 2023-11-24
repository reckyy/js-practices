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
          resolve(this.lastID);
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
  db.run("DROP TABLE books");
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
  db.run("DROP TABLE books");
})();

db.close;