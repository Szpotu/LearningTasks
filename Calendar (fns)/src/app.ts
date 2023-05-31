import formatISO9075 from "date-fns/formatISO9075";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import addDays from "date-fns/addDays";
import isPast from 'date-fns/isPast';
import isFuture from 'date-fns/isFuture';


// Vars
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// HTML Elements
const watchContent = document.getElementById("watch");
const calendarBox = document.getElementById("calendar");
const previousBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// time handler
const handleTime = (): void => {
  const formated = formatISO9075(new Date(), { representation: "time" });
  if (watchContent !== null) {
    watchContent.textContent = formated;
  }
};
//set color 



let currentTimeRef = new Date();
let weekUnix = 1000 * 60 * 60 * 24 * 7; 
// calendar handling
const handleWeek = (direction: string | null = null): void => {
  if (direction === 'prev') {
    currentTimeRef = new Date((currentTimeRef.getTime()) - weekUnix);
  } else if (direction ==='next') {
    currentTimeRef = new Date((currentTimeRef.getTime()) + weekUnix);
  } else if (direction === null) {

  } else {
    throw Error('Given parameter needs to match one of given: null, prev or next');
  }
  let week = eachDayOfInterval({ 
    start: currentTimeRef,
    end: addDays(currentTimeRef, 7),
  });
  if (calendarBox !== null) {
    Array.from(calendarBox.children).forEach((element, index) => {
      element.removeAttribute('class');
      const currentDate = week[index];
      if (isPast(currentDate)) {
        element.classList.add('past');
      } else if (isFuture(currentDate)) {
        
        element.classList.add('future');
      } else {
        element.classList.add('present');
      }
      element.textContent = `
        ${daysOfWeek[currentDate.getDay()]} /
        ${currentDate.getDate()} /
        ${currentDate.getMonth() + 1} /
        ${currentDate.getFullYear()}
      `;
    });
  }
};

handleWeek();

nextBtn?.addEventListener('click', () => {
  handleWeek('next');
})
previousBtn?.addEventListener('click', () => {
  handleWeek('prev');
})

setInterval(() => {
  handleTime();
}, 1000);

