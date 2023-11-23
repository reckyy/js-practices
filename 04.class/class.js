import sqlite3 from "sqlite3";
import readline from "readline";

const dbPath = "memo.db";

const db = new sqlite3.Database(dbPath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const createTable = () => {
  return new Promise((resolve, reject) => {
    db.run(
      "create table if not exists memos (id integer primary key autoincrement, content text)",
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

const addMemo = (data) => {
  return new Promise((resolve, reject) => {
    db.run("insert into memos(content) values(?)", data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();  
      }
    });
  });
};

const lines = [];
rl.on("line", (line) => {
  lines.push(line);
});

rl.on("close", async () => {
  const input = lines.join('\n');
  await createTable();
  try {
    await addMemo(input);
  } catch (e) {
    console.error(e);
  } finally {
    db.close();
  }
});
