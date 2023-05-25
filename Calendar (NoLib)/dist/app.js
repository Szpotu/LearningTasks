"use strict";
const longDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
// divs 
const [dashboard, currentTimeBox, yearBlock, timeBlock] = Array.from({ length: 4 }, () => document.createElement('div'));
// ul 
const calendarBox = document.createElement('ul');
// spans - hour + current date containers 
for (let i = 0; i < 3; i++) {
    yearBlock.appendChild(document.createElement('span'));
    timeBlock.appendChild(document.createElement('span'));
}
// buttons - prev + next 
const [prev, next] = Array.from({
    length: 2
}, () => document.createElement('button'));
prev.setAttribute('id', 'prev');
next.setAttribute('id', 'next');
//Append elements 
const componentParts = [currentTimeBox, calendarBox];
const timeBoxParts = [yearBlock, timeBlock];
const controls = [prev, next];
dashboard.setAttribute("id", "dashboard");
timeBoxParts.forEach((element) => currentTimeBox.appendChild(element));
const appendElements = (...HTMLElement) => {
    HTMLElement.forEach(element => dashboard.appendChild(element));
};
appendElements(...componentParts, ...timeBoxParts, ...controls);
document.body.appendChild(dashboard);
// Set time
const handleTime = () => {
    const currentDate = new Date();
    const MY_DATE = {
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
        year: currentDate.getFullYear(),
    };
    const MY_HOUR = {
        hours: currentDate.getHours(),
        minutes: currentDate.getMinutes(),
        seconds: currentDate.getSeconds(),
    };
    Array.from(timeBlock.children).forEach((element, index) => {
        if (Object.values(MY_HOUR)[index] < 10) {
            element.textContent = `0${Object.values(MY_HOUR)[index]} / `;
        }
        else {
            element.textContent = Object.values(MY_HOUR)[index].toString() + '/';
        }
    });
    Array.from(yearBlock.children).forEach((element, index) => {
        if (Object.values(MY_DATE)[index] < 10) {
            element.textContent = `0${Object.values(MY_DATE)[index]} /`;
        }
        else {
            element.textContent = Object.values(MY_DATE)[index].toString() + '/';
        }
    });
};
// Calendar assets 
for (let i = 0; i < 7; i++) {
    let newBox = document.createElement("li");
    newBox.setAttribute("data-weekday", `${i}`);
    calendarBox.appendChild(newBox);
}
// function returns the first sunday of the given date 
const getFirstWeekDay = (date) => {
    const currentWeekDay = date.getDay();
    if (currentWeekDay !== 0) {
        const sundayDate = new Date(date);
        sundayDate.setDate(date.getDate() - currentWeekDay);
        return sundayDate;
    }
    else {
        return date;
    }
};
// function returns the array of days starting from 0 (sunday)
const weekDays = (date) => {
    // check if the day is 0 (sunday)
    if (date.getDay() !== 0) {
        date = getFirstWeekDay(date);
    }
    const dateList = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(date);
        currentDate.setDate(date.getDate() + i);
        dateList.push(currentDate);
    }
    return dateList;
};
// set color 
//Deploy days in the boxes 
let timeUTC = new Date().getTime();
const deployDays = (direction) => {
    let currentWeek = [];
    let weekUTC = 1000 * 60 * 60 * 24 * 7;
    if (direction !== null && direction.getAttribute('id') === 'prev') {
        currentWeek = weekDays(new Date(timeUTC - weekUTC));
        timeUTC -= weekUTC;
    }
    else if (direction !== null && direction.getAttribute('id') === 'next') {
        currentWeek = weekDays(new Date(timeUTC + weekUTC));
        timeUTC += weekUTC;
    }
    else {
        currentWeek = weekDays(new Date());
    }
    const currentDate = new Date();
    Array.from(calendarBox.children).forEach((element, index) => {
        const boxDate = currentWeek[index];
        element.textContent = `${longDays[index]}/${boxDate.getDate()}/${boxDate.getMonth()}/${boxDate.getFullYear()}`;
        const isPast = boxDate.getDay() < currentDate.getDay();
        const isPresent = boxDate.toDateString() === currentDate.toDateString();
        if (isPast) {
            element.setAttribute('style', 'background-color: gray;');
        }
        else if (isPresent) {
            element.setAttribute('style', 'background-color: lightgreen;');
        }
        else {
            element.setAttribute('style', 'background-color: green;');
        }
    });
};
deployDays(null);
// Watch movement
setInterval(handleTime, 1000);
prev.addEventListener('click', () => {
    deployDays(prev);
});
next.addEventListener('click', () => {
    deployDays(next);
});
