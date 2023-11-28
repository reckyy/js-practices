import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { run, get } from "./handle_db.js";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
(async () => {
  await run(db, "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)");
  const id = await run(db, "INSERT INTO books(title) VALUES('テスト')");
	console.log(`自動採番ID :${id}`);
  const row = await get(db, "SELECT * FROM books");
	console.log(`id:${row.id} タイトル:${row.title}`);
  await run(db, "DROP TABLE books");
})();

await timers.setTimeout(100);

console.log("エラーあり");
(async () => {
  await run(db, "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)");
  try {
    await run(db, "INSERT INTO users(title) VALUES('テスト')");
  } catch (err) {
    console.error(err);
  } try {
    await get(db, "SELECT * FROM users");
  }catch (err) {
    console.error(err);
  } finally {
    await run(db, "DROP TABLE books");
    db.close();
  }
})();
