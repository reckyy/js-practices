//モジュールの読み込み
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

const get_record = () => {
  return new Promise((resolve, reject) => {
   db.get('select * from books where id = ?', 1, (err, row) => {
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
  const row = await get_record();
  console.log(`id:${row.id} タイトル:${row.title}`); 
  db.run('drop table books');
})();

await timers.setTimeout(100);
