import { MemoStorage } from "./MemoStorage.js";
import { MemoApp } from "./MemoApp.js";

const sql = new MemoStorage();
const memoApp = new MemoApp();

memoApp.run(sql);
