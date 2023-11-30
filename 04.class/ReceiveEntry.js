import readline from "readline";

export class ReceiveEntry{
  constructor(){
    this.rl = readline.createInterface({
      input: process.stdin,
    });
  }

  saveInput(sql){
    const lines = [];
    this.rl.on("line", (line) => {
      lines.push(line);
    })
    
    this.rl.on("close", async() => {
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
  }
}
