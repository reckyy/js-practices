import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = DateTime.now();

const year = parseInt(argv.y) || today.year;
const month = parseInt(argv.m) || today.month;

const firstDate = DateTime.fromObject({ year, month });
const firstDay = firstDate.weekday;

console.log(`      ${firstDate.month}月 ${firstDate.year}`);
console.log("日 月 火 水 木 金 土");
if (firstDate.weekday !== 7) {
  process.stdout.write("   ".repeat(firstDay));
}
for (let day = 1; day <= firstDate.daysInMonth; day++) {
  const datetime = firstDate.set({ day });
  const dateString = String(day).padStart(2, " ");
  const separator = datetime.weekday === 6 ? "\n" : " ";
  process.stdout.write(dateString + separator);
}
console.log("");
