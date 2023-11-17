import { DateTime } from "luxon";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const today = DateTime.now();

const year = parseInt(argv.y) || today.year;
const month = parseInt(argv.m) || today.month;

const first_date_of_the_month = DateTime.fromObject({
  year: year,
  month: month,
});
const first_day_of_the_month = first_date_of_the_month.weekday;

/*calendarを表示*/
console.log(
  "      %i月 %i",
  first_date_of_the_month.month,
  first_date_of_the_month.year,
);
console.log("日 月 火 水 木 金 土");
if (first_date_of_the_month.weekday !== 7) {
  process.stdout.write("   ".repeat(first_day_of_the_month));
}
for (let i = 1; i <= first_date_of_the_month.daysInMonth; i++) {
  const datetime = first_date_of_the_month.set({ day: i });
  let day_string = String(i).padStart(2, " ");
  if (datetime.weekday === 6) {
    day_string += "\n";
  } else {
    day_string += " ";
  }
  process.stdout.write(day_string);
}
console.log("");
