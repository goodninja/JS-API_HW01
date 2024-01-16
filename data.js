const data = [
  { name: "Crossfit", dateTime: "08.30", maxUsers: 50, currentUsers: 34 },
  { name: "Tabata", dateTime: "14.00", maxUsers: 30, currentUsers: 22 },
  { name: "Cycle workout", dateTime: "19.00", maxUsers: 20, currentUsers: 18 },
];

let counter = 0;

const schedulesKey = "schedules";

if (localStorage.getItem(schedulesKey) === null) {
  data.forEach((el) => {
    el.id = createId();
    counter++;
  });
  localStorage.setItem(schedulesKey, JSON.stringify(data));
}

if (getAllSchedules().length === 0) {
  downloadRepo();
}

function downloadSchedules() {
  data.forEach((el) => {
    el.id = createId();
    counter++;
  });

  const schedules = JSON.stringify(data);
  data.forEach((schedule) => {
    schedules.push(schedule);
  });
  localStorage.setItem(schedulesKey, schedules);
}

function getAllSchedules() {
  return JSON.parse(localStorage.getItem(schedulesKey));
}

function createId() {
  return `f${(+new Date() + counter).toString(16)}`;
}

function changeShedule(id, current) {
  console.log(current);
  let schedules = getAllSchedules();
  schedules.forEach((shedule) => {
    if (shedule.id === id) {
      shedule.currentUsers = current;
    }
  });
  localStorage.setItem(schedulesKey, JSON.stringify(schedules));
}
