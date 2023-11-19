import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = DateTime.now();

const year = parseInt(argv.y) || today.year;
const month = parseInt(argv.m) || today.month;

const firstDate = DateTime.fromObject({
  year: year,
  month: month,
});
const firstDay= firstDate.weekday;

console.log(
  "      %i月 %i",
  firstDate.month,
  firstDate.year,
);
console.log("日 月 火 水 木 金 土");
if (firstDate.weekday !== 7) {
  process.stdout.write("   ".repeat(firstDay));
}
for (let i = 1; i <= firstDate.daysInMonth; i++) {
  const datetime = firstDate.set({ day: i });
  let day_string = String(i).padStart(2, " ");
  if (datetime.weekday === 6) {
    day_string += "\n";
  } else {
    day_string += " ";
  }
  process.stdout.write(day_string);
}
console.log("");
