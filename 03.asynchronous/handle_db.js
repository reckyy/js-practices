const createTable = (db) => {
  return new Promise((resolve, reject) => {
    db.run(
      "CREATE TABLE books(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT UNIQUE)",
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

const insertValue = (table_name, db) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${table_name}(title) VALUES(?)`,
      "テスト",
      function (err) {
        if (err) {
          reject(err);
        } else {
          console.log(`自動採番ID : ${this.lastID}`);
          resolve();
        }
      },
    );
  });
};

const getRecord = (table_name, db) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM ${table_name} WHERE id = ?`, 1, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(`id:${row.id} タイトル:${row.title}`);
        resolve();
      }
    });
  });
};

const dropTable = (db) => {
  return new Promise((resolve, reject) => {
    db.run("DROP TABLE books", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export{ createTable, insertValue, getRecord, dropTable }
