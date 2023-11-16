import timers from "timers/promises";
import sqlite3 from "sqlite3";
const db = new sqlite3.Database(':memory:');


//Promise用のメソッド作成
const create_table = () => {
  return new Promise((resolve, reject) => {
    db.run('create table books(id integer primary key autoincrement, title text unique)', (err) => {
      if(err){
        reject(err);
      }else{
        resolve();
			}
    })
  });
}

const insert_value = (table_name) => {
  return new Promise((resolve, reject) => {
  db.run(`insert into ${table_name}(title) values(?)`, 'テスト', function(err) {
      if(err){
        reject(err);
      }else{
        resolve(this.lastID);
			}
    })
  });
}

const get_record = (table_name) => {
  return new Promise((resolve, reject) => {
   db.get(`select * from ${table_name} where id = ?`, 1, (err, row) => {
      if(err){
        reject(err);
      }else{
        resolve(row);
			}
    })
  });
}

console.log('エラーなし');
(async () => {
  await create_table();
  const lastID = await insert_value('books');
  console.log(`自動採番ID : ${lastID}`);
  const row = await get_record('books');
  console.log(`id:${row.id} タイトル:${row.title}`); 
  db.run('drop table books');
})();

await timers.setTimeout(100);

console.log('エラーあり');
(async () => {
  await create_table();
  try {
    const lastID = await insert_value('users');
    console.log(`自動採番ID : ${lastID}`);
  } catch(e) {
      console.error(e)
  }
  try{
    const row = await get_record('users');
    console.log(`id:${row.id} タイトル:${row.title}`); 
  } catch(e) {
    console.error(e)
  }
  db.run('drop table books');
})();
