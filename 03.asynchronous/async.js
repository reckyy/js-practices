import timers from "timers/promises";
import sqlite3 from "sqlite3";
import {createTable, insertValue, getRecord, dropTable} from "./handle_db.js";

const db = new sqlite3.Database(":memory:");

console.log("エラーなし");
(async () => {
  await createTable(db);
  await insertValue("books", db);
  await getRecord("books", db);
  await dropTable(db);
})();

await timers.setTimeout(100);

console.log("エラーあり");
(async () => {
  await createTable(db);
  try {
    await insertValue("users", db);
  } catch (err) {
    console.error(err);
  }
  try {
    await getRecord("users", db);
  } catch (err) {
    console.error(err);
  }
  finally {
    await dropTable(db);
    db.close();
  }
})();
