import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", "テスト", function () {
      console.log(this);
      db.get("SELECT * FROM books WHERE id = ?", 1, (_, row) => {
        console.log(`id:${row.id} タイトル:${row.title}`);
      });
    });
  },
);

await timers.setTimeout(100);

console.log("エラーあり");
db.run(
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)",
  () => {
    db.run("INSERT INTO books(title) VALUES(?)", "テスト", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`自動採番ID :${this.lastID}`);
      }
      db.get("SELECT * FROM books WHERE id = ?", 1, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`id:${row.id} タイトル:${row.title}`);
        }
        db.run("DROP TABLE books");
      });
    });
  },
);

db.close;
