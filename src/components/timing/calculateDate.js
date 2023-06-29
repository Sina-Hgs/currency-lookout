let today;
let week;
let oneMonth;
let sixMonths;
let year;

// this function calculates the needed dates for data fetching
const calculateDates = () => {
  console.log("Calcultating dates 📅...");
  const now = new Date();

  // TODAY
  // I need to get the hours so the day's date doesn't get messed up while using
  // toISOString because of timezones hour offset of the user's location
  const dateOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours()
  );

  today = dateOfToday.toISOString().slice(0, 10);

  // A WEEK AGO
  // substracting 6 days of today's date to get the initial startDate
  // because the 7th day is the endDate (i.e. today)
  const dateOfAWeekAgo = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 6,
    now.getHours()
  );
  week = dateOfAWeekAgo.toISOString().slice(0, 10);

  // ONE MONTH AGO
  // DECIDED TO GO FOR A MONTH AGO'S DATE RATHER THAN 30 OR 31 DAYS
  const dateOfAMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate(),
    now.getHours()
  );
  oneMonth = dateOfAMonthAgo.toISOString().slice(0, 10);

  // 6 MONTHS AGO
  // CALCULATING 6 MONTHS AGO'S DATE AND NOT 180 DAYS
  const dateOfSixMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 6,
    now.getDate(),
    now.getHours()
  );
  sixMonths = dateOfSixMonthsAgo.toISOString().slice(0, 10);

  // A YEAR AGO
  // CALCULATING A YEAR AGO'S DATE AND NOT 365 DAYS
  const dateOfAYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate(),
    now.getHours()
  );
  year = dateOfAYearAgo.toISOString().slice(0, 10);
};

calculateDates();

export { today, week, oneMonth, sixMonths, year };
