const classes = document.querySelector(".classes");

const schedules = getAllSchedules();

if (schedules) {
  schedules.forEach((schedule) => {
    renderScheduleHtml(
      schedule.id,
      schedule.name,
      schedule.dateTime,
      schedule.maxUsers,
      schedule.currentUsers
    );
  });
}

function renderScheduleHtml(id, name, dateTime, maxUsers, currentUsers) {
  classes.insertAdjacentHTML(
    "beforeEnd",
    `
            <li id="${id}" class="classes__item">
                <div class="item">
                    <p class="item__title">${name}</p>
                    <p hidden>${id}</p>
                    <p class="item__time">${dateTime}</p>
                    <p class="item__maxusers">${maxUsers}</p>
                    <a data-tooltip="Отписаться" class="item__currentusers">${currentUsers}</a>
                </div>
                <button data-togle-id="${id}" class="item__btn active">Записаться</button>
            </li>
        `
  );
}

const btns = document.querySelectorAll(".item__btn");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const elId = e.target.dataset.togleId;
    if (maxValueCheck(elId)) {
      addANote(elId);
    } else {
      btn.disabled = true;
      btn.classList.remove("active");
      btn.classList.add("disabled");
    }
  });
});

function maxValueCheck(elId) {
  const element = document.getElementById(elId);
  const maxUsers = +element.querySelector(".item__maxusers").textContent;
  const currentUsers = +element.querySelector(".item__currentusers")
    .textContent;
  if (maxUsers > currentUsers) return true;
  else return false;
}

function addANote(elId) {
  const element = document.getElementById(elId);
  let currentUsers = element.querySelector(".item__currentusers");
  let content = +currentUsers.textContent;
  content++;
  currentUsers.textContent = `${content}`;
  changeShedule(elId, content);
}

function changeCurrentUsers(elId, element) {
  let currentUsers = element.textContent;
  currentUsers--;
  element.textContent = `${currentUsers}`;
  changeShedule(elId, currentUsers);
}

document.querySelectorAll(".item__currentusers").forEach((el) => {
  el.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("id");
    if (!maxValueCheck(id)) {
      let btn = document.getElementById(id).querySelector(".item__btn");
      btn.disabled = false;
      btn.classList.remove("disabled");
      btn.classList.add("active");
    }
    changeCurrentUsers(id, e.target);
  });
});
