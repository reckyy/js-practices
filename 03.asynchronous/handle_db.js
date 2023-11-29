const run = (db, sql) => {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const get = (db, sql, id) => {
  return new Promise((resolve, reject) => {
    db.get(sql, id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

export { run, get };
