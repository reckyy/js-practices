import { MemoStorage } from "./MemoStorage.js";
import { MemoApp } from "./MemoApp.js";

const sql = new MemoStorage();
const memoApp = new MemoApp();

if (memoApp.option) {
  memoApp.run(sql);
} else {
  memoApp.saveInput(sql);
}
