import enquirer from "enquirer";
import readline from "readline";

export class MemoApp {
  constructor() {
    this.option = process.argv[2];
  }

  run(sql) {
    if (this.option){
      (async () => {
        const memos = await sql.all();
        const firstRowsOfMemos = memos.map(({ id, content }) => ({
          id: id,
          value: content.split("\n")[0],
        }));
        try {
          switch (this.option) {
            case "-l": {
              firstRowsOfMemos.forEach((row) => console.log(row.value));
              break;
            }
            case "-r": {
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
              const chosenMemo = memos.find(
                (memo) => memo.id === answer.chosenMemoId
              );
              console.log(chosenMemo.content);
              break;
            }
            case "-d": {
              const questions = [
                {
                  type: "select",
                  name: "chosenMemoId",
                  message: "Choose a note you want to delete:",
                  choices: firstRowsOfMemos,
                  result() {
                    return this.focused.id;
                  },
                },
              ];
              const answer = await enquirer.prompt(questions);
              await sql.delete(answer.chosenMemoId);
              console.log("memo of your choice is deleted!");
              break;
            }
          }
        } catch (err) {
          console.error(err);
        } finally {
          sql.close();
        }
      })();
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
      });
      const lines = [];
      rl.on("line", (line) => {
        lines.push(line);
      });

      rl.on("close", async () => {
        const input = lines.join("\n");
        await sql.createTable();
        try {
          await sql.add(input);
          console.log("your entry is saved!");
        } catch (err) {
          console.error(err);
        } finally {
          sql.close();
        }
      });
    }
  }
}
