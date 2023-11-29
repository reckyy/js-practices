import sqlite3 from "sqlite3";
import readline from "readline";
import enquirer from "enquirer";

const db = new sqlite3.Database("./memo.sqlite");
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
      }
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

const getAllMemo = () => {
  return new Promise((resolve, reject) => {
    db.all("select * from memos", function (err, rows) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const option = process.argv[2];


if (option) {
  (async () => {
    const memos = await getAllMemo();
		const firstRowsOfMemos = memos.map(({id, content}) => ({
            id: id,
            value: content.split('\n')[0],
          }));
    try {
      switch (option) {
        case '-r': {
					const questions = [
					  {
					    type: "select",
					    name: "chosenMemoId",
					    message: "Choose a note you want to see:",
					    choices: firstRowsOfMemos,
					    result() {
					      return this.focused.id;
					    },
					  },
					];
          const answer = await enquirer.prompt(questions);
          console.log(memos[answer.chosenMemoId - 1].content);
          break;
				}
        case '-l': {
					firstRowsOfMemos.forEach((row) => console.log(row.value));
          break;
				}
      }
    } catch (e) {
      console.error(e);
    } finally {
      db.close();
      rl.close();
    }
  })();
} else {
  const lines = [];
  rl.on("line", (line) => {
    lines.push(line);
  });

  rl.on("close", async () => {
    const input = lines.join("\n");
    await createTable();
    try {
      await addMemo(input);
    } catch (e) {
      console.error(e);
    } finally {
      db.close();
    }
  });
}
