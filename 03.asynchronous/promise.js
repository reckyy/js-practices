import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, get } from "./handle_db.js";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)"
)
  .then(() => run(db, "INSERT INTO books(title) VALUES('テスト')"))
  .then((id) => {
    console.log(`自動採番ID : ${id}`);
    return get(db, "SELECT * FROM books");
  })
  .then((row) => {
    console.log(`id:${row.id} タイトル:${row.title}`);
    run(db, "DROP TABLE books");
  });

await timers.setTimeout(100);

console.log("エラーあり");
run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)"
)
  .then(() => run(db, "INSERT INTO users(title) VALUES('テスト')"))
  .catch((err) => {
    console.error(err);
    return get(db, "SELECT * FROM users");
  })
  .catch((err) => {
    console.error(err);
    run(db, "DROP TABLE books");
  })
  .then(() => db.close());
