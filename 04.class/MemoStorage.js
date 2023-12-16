import sqlite3 from "sqlite3";

export class MemoStorage {
  constructor() {
    this.db = new sqlite3.Database("./memo.sqlite");
  }

  createTable() {
    return new Promise((resolve, reject) => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS memos (id integer primary key autoincrement, content text)",
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  add(params) {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO memos(content) VALUES(?)",
        params,
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos ORDER BY id", function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  delete(params) {
    return new Promise((resolve, reject) => {
      this.db.run("DELETE FROM memos WHERE id = ?", params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}
