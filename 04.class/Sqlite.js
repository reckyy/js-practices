import sqlite3 from "sqlite3";

export class Sqlite {
  constructor() {
    this.db = new sqlite3.Database("./memo.sqlite");
  }

  run(sql) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * FROM memos", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    this.db.close();
  }
}
