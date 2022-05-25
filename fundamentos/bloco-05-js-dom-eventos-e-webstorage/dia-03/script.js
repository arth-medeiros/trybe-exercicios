function createDaysOfTheWeek() {
  const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
  const weekDaysList = document.querySelector('.week-days');

  for (let index = 0; index < weekDays.length; index += 1) {
    const days = weekDays[index];
    const dayListItem = document.createElement('li');
    dayListItem.innerHTML = days;

    weekDaysList.appendChild(dayListItem);
  };
};

createDaysOfTheWeek();

// Escreva seu código abaixo.
//Exercício 1

const dezDaysList = [29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
function isHoliday(element) {
  if (element.innerText == 24 || element.innerText == 25 || element.innerText == 31) {
    element.classList.add('holiday');
  }
}
function isFriday(element) {
  if (element.innerText == 4 || element.innerText == 11 || element.innerText == 18 || element.innerText == 25) {
    element.classList.add('friday');
  }
}
function createCalendar(intArray) {
  for (let i = 0; i < intArray.length; i += 1) {
    let newDay = document.createElement('li');
    newDay.innerText = intArray[i];
    newDay.classList.add('day');
    isHoliday(newDay);
    isFriday(newDay);
    document.querySelector('#days').appendChild(newDay);
  }
}
createCalendar(dezDaysList);

//Exercício 2

let feriados = 'Feriados';
function createBtnHoliday(string) {
  let btn = document.createElement('button');
  btn.innerText = string;
  btn.setAttribute('id', 'btn-holiday');
  document.querySelector('.buttons-container').appendChild(btn);
}
createBtnHoliday(feriados);

//Exercício 3
let holidayBool = false;
function highlightHoliday() {
let holidays = document.querySelectorAll('.holiday');
if (holidayBool === false) {
  for (let i = 0; i < holidays.length; i += 1) {
    holidays[i].style.backgroundColor = 'rgb(198,198,198)';
  }
  holidayBool = true;
}
else {
  for (let i = 0; i < holidays.length; i += 1) {
    holidays[i].style.backgroundColor = 'rgb(238,238,238)';
  } 
  holidayBool = false;
}
}
let holidayBTN = document.querySelector('#btn-holiday');
holidayBTN.addEventListener('click', highlightHoliday);

//Exercício 4
let sextaFeira = 'Sexta-feira';
function createBtnFriday(string) {
  let btn = document.createElement('button');
  btn.innerText = string;
  btn.setAttribute('id', 'btn-friday');
  document.querySelector('.buttons-container').appendChild(btn);
}
createBtnFriday(sextaFeira);

//Exercício 5
let fridayBool = false;
function changeFriday() {
  let fridays = document.querySelectorAll('.friday');
  if (fridayBool === false) {
    for (let i = 0; i < fridays.length; i += 1) {
      fridays[i].innerText = 'SEXTOU';
    }
    fridayBool = true;
  }
  else {
    for (let i = 0; i < fridays.length; i += 1) {
      fridays[i].innerText = parseInt(fridays[i].previousSibling.innerText) + 1;
    }
    fridayBool = false;
  }
}
let fridayBTN = document.querySelector('#btn-friday');
fridayBTN.addEventListener('click', changeFriday);

//Exercício 6
function focusOnHover(origin) {
  origin.target.style.fontSize = '35px';
}
function unfocusOnHover(origin) {
  origin.target.style.fontSize = '20px';
}
let dayList = document.querySelectorAll('.day');
for (let i = 0; i < dayList.length; i += 1) {
  dayList[i].addEventListener('mouseover', focusOnHover);
  dayList[i].addEventListener('mouseout', unfocusOnHover);
}

//Exercício 8
let cor = 'green';

function newTaskDiv(string) {
  let newDiv = document.createElement('div');
  newDiv.classList.add('task');
  newDiv.style.backgroundColor = string;
  document.querySelector('.my-tasks').appendChild(newDiv);
}

//Exercício 7
function newTask() {
  let newTask = document.querySelector('#task-input').value;
  let taskListItem = document.createElement('span');
  taskListItem.innerText = newTask;
  document.querySelector('.my-tasks').appendChild(taskListItem);
  newTaskDiv(cor);
}
let addBTN = document.querySelector('#btn-add');
addBTN.addEventListener('click', newTask);

//Exercício 9
