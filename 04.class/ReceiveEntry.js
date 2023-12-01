import readline from "readline";

export class ReceiveEntry {
  static saveInput(sql) {
    const rl = readline.createInterface({
      input: process.stdin,
    });
    const lines = [];
    rl.on("line", (line) => {
      lines.push(line);
    });

    rl.on("close", async () => {
      const input = lines.join("\n");
      await sql.run(
        "CREATE TABLE IF NOT EXISTS memos (id integer primary key autoincrement, content text)"
      );
      try {
        await sql.run(`INSERT INTO memos(content) VALUES('${input}')`);
        console.log("your entry is saved!");
      } catch (err) {
        console.error(err);
      } finally {
        sql.close();
      }
    });
  }
}
