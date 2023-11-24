import timers from "timers/promises";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
db.run(
  "create table books(id integer primary key autoincrement, title text unique)",
  () => {
    db.run("insert into books(title) values(?)", "テスト", function () {
      console.log(this);
      db.get("select * from books where id = ?", 1, (_, row) => {
        console.log(`id:${row.id} タイトル:${row.title}`);
      });
    });
  },
);

await timers.setTimeout(100);

console.log("エラーあり");
db.run(
  "create table books(id integer primary key autoincrement, title text unique)",
  () => {
    db.run("insert into users(title) values(?)", "テスト", function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log(`自動採番ID :${this.lastID}`);
      }
      db.get("select * from users where id = ?", 1, (err, row) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`id:${row.id} タイトル:${row.title}`);
        }
        db.run("drop table books");
      });
    });
  },
);

db.close;
