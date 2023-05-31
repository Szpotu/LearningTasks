"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formatISO9075_1 = __importDefault(require("date-fns/formatISO9075"));
const eachDayOfInterval_1 = __importDefault(require("date-fns/eachDayOfInterval"));
const addDays_1 = __importDefault(require("date-fns/addDays"));
const date_fns_1 = require("date-fns");
// Vars
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// HTML Elements
const watchContent = document.getElementById("watch");
const calendarBox = document.getElementById("calendar");
const previousBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
// time handler
const handleTime = () => {
    const formated = (0, formatISO9075_1.default)(new Date(), { representation: "time" });
    if (watchContent !== null) {
        watchContent.textContent = formated;
    }
};
let currentTimeRef = new Date();
let weekUnix = 1000 * 60 * 60 * 24 * 7;
// calendar handling
const handleWeek = (direction = null) => {
    if (direction === 'prev') {
        currentTimeRef = (0, date_fns_1.fromUnixTime)(currentTimeRef.getTime() - weekUnix);
    }
    else if (direction === 'next') {
        currentTimeRef = (0, date_fns_1.fromUnixTime)(currentTimeRef.getTime() + weekUnix);
    }
    else {
        throw new Error('Given direction must be in format of either prev or next');
    }
    let week = (0, eachDayOfInterval_1.default)({
        start: currentTimeRef,
        end: (0, addDays_1.default)(currentTimeRef, 7),
    });
    if (calendarBox !== null) {
        Array.from(calendarBox.children).forEach((element, index) => {
            element.textContent = `
        ${daysOfWeek[week[index].getDay()]} / 
        ${week[index].getDate()} / 
        ${week[index].getMonth() + 1} / 
        ${week[index].getFullYear()}
      `;
        });
    }
};
handleWeek();
nextBtn === null || nextBtn === void 0 ? void 0 : nextBtn.addEventListener('click', () => {
    handleWeek('next');
});
previousBtn === null || previousBtn === void 0 ? void 0 : previousBtn.addEventListener('click', () => {
    handleWeek('prev');
});
setInterval(() => {
    handleTime();
}, 1000);
