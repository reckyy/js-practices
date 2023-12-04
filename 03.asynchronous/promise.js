import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, get } from "./wrapped-sqlite-function.js";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)"
)
  .then(() => run(db, "INSERT INTO books(title) VALUES(?)", "テスト"))
  .then((result) => {
    console.log(`自動採番ID : ${result.lastID}`);
    return get(db, "SELECT * FROM books WHERE id = ?", result.lastID);
  })
  .then((row) => {
    console.log(`id:${row.id} タイトル:${row.title}`);
    return run(db, "DROP TABLE books");
  });

await timers.setTimeout(100);

console.log("エラーあり");
run(
  db,
  "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)"
)
  .then(() => run(db, "INSERT INTO users(title) VALUES(?)", "テスト"))
  .catch((err) => {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
      return get(db, "SELECT * FROM users WHERE id = ?", 1);
    } else {
      throw err;
    }
  })
  .catch((err) => {
    if (err.code === "SQLITE_ERROR") {
      console.error(err.message);
      return run(db, "DROP TABLE books");
    } else {
      throw err;
    }
  })
  .then(() => db.close());
