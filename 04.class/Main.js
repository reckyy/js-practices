import { Sqlite } from "./Sqlite.js";
import { ReceiveEntry } from "./ReceiveEntry.js";

const reader = new ReceiveEntry();
const sql = new Sqlite();
const lines = [];

reader.rl.on("line", (line) => {
  lines.push(line);
})

reader.rl.on("close", async() => {
  const input = lines.join('\n');
  await sql.run("create table if not exists memos (id integer primary key autoincrement, content text)");
  try {
    await sql.run(`insert into memos(content) values('${input}')`);
    console.log('your entry is saved!');
  } catch (err) {
    console.error(err);
  } finally {
    sql.close();
  }
});
