import { Sqlite } from "./Sqlite.js";
import { ReceiveEntry } from "./ReceiveEntry.js";
import { Prompt } from "./Prompt.js";

const sql = new Sqlite();
const prompt = new Prompt();

if (prompt.option) {
  prompt.pattern_by_prompt(sql);
} else {
  ReceiveEntry.saveInput(sql);
}
