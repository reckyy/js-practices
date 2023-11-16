import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = DateTime.now();

const year = parseInt(argv.y) || today.year;
const month = parseInt(argv.m) || today.month;

const dt = DateTime.fromObject({
  year: year,
  month: month,
});

/*calendarを表示*/
console.log("      %i月 %i\n日 月 火 水 木 金 土", dt.month, dt.year);
const month_beginning_number = dt.startOf("month").weekday;
if (month_beginning_number !== 7) {
  process.stdout.write("   ".repeat(month_beginning_number));
}
for (let i = 1; i <= dt.daysInMonth; i++) {
  const day = dt.set({ day: i });
  let day_string = String(i).padStart(2, " ");
  if (day.weekday === 6) {
    day_string += "\n";
  } else {
    day_string += " ";
  }
  process.stdout.write(day_string);
}
console.log("");
