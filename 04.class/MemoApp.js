import enquirer from "enquirer";
import readline from "readline";

export class MemoApp {
  constructor() {
    this.option = process.argv[2];
  }

  async run(sql) {
    if (this.option) {
      const [memos, firstRowsOfMemos] = await this.#takeMemoInfo(sql);
      try {
        switch (this.option) {
          case "-l": {
            this.#listMemos(firstRowsOfMemos);
            break;
          }
          case "-r": {
            await this.#showMemo(firstRowsOfMemos, memos);
            break;
          }
          case "-d": {
            await this.#deleteMemo(firstRowsOfMemos, sql);
            break;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        sql.close();
      }
    } else {
      this.#saveInput(sql);
    }
  }

  async #takeMemoInfo(sql) {
    const memos = await sql.all();
    const firstRowsOfMemos = memos.map(({ id, content }) => ({
      id: id,
      value: content.split("\n")[0],
    }));
    return [memos, firstRowsOfMemos];
  }

  #listMemos(firstRowsOfMemos) {
    firstRowsOfMemos.forEach((row) => console.log(row.value));
  }

  async #showMemo(firstRowsOfMemos, memos) {
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
    const chosenMemo = memos.find((memo) => memo.id === answer.chosenMemoId);
    console.log(chosenMemo.content);
  }

  async #deleteMemo(firstRowsOfMemos, sql) {
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
  }

  #saveInput(sql) {
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
