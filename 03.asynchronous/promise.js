import timers from "timers/promises";
import sqlite3 from "sqlite3";
import { createTable, insertValue, getRecord, dropTable } from "./handle_db.js";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
createTable(db)
  .then(() => insertValue("books", db))
  .then(() => getRecord("books", db))
  .then(() => dropTable(db));

await timers.setTimeout(100);

console.log("エラーあり");
createTable(db)
  .then(() => insertValue("users", db))
  .catch((err) => console.error(err))
  .then(() => getRecord("users", db))
  .catch((err) => console.error(err))
  .then(() => dropTable(db))
  .then(() => db.close());
