import {
    format,
    getUnixTime,
    fromUnixTime,
    addMonths,
    subMonths,
    startOfWeek,
    startOfMonth,
    endOfWeek,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay
} from "date-fns";

const datePickerBtn = document.querySelector('.date-picker-btn');
const datePicker = document.querySelector('.date-picker');
const datePickerMonth = document.querySelector('.date-picker-month');
const prevMonthBtn = document.querySelector('.prevMonthBtn');
const nextMonthBtn = document.querySelector('.nextMonthBtn');
let currentDate = new Date();

//initializes the date on button
function setDate(date) {
    datePickerBtn.innerHTML = format(date, "MMMM dd, yyyy");
    datePickerBtn.dataset.selectedDate = getUnixTime(date);
}
setDate(currentDate);

//when the button is clicked
datePickerBtn.addEventListener('click', () => {
    datePicker.classList.toggle('hide');
    const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
    currentDate = selectedDate;
    setupDatePicker(selectedDate);
})

//sets up the date picker that pops with everything correctly rendered
function setupDatePicker(selectedDate) {
    datePickerMonth.innerText = format(currentDate, "MMMM - yyyy");
    setupDates(selectedDate);
}
function setupDates(selectedDate) {
    const datePickerDates = document.querySelector('.date-picker-dates');
    const firstWeekStart = startOfWeek(startOfMonth(currentDate));  //date-fns functions
    const lastWeekEnd = endOfWeek(endOfMonth(currentDate));         //date-fns functions
    const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeekEnd}); //date-fns functions
    datePickerDates.innerHTML = "";
    dates.forEach(date => {
        const dateElement = document.createElement('button');
        dateElement.innerHTML = date.getDate();
        dateElement.classList.add("date");
        if (!isSameMonth(date, currentDate)) {
            dateElement.classList.add('other-month-date');
        }
        if (isSameDay(date, selectedDate)) {
            dateElement.classList.add('selected');
        }
        dateElement.addEventListener('click', () => {
            setDate(date);
            datePicker.classList.toggle('hide');
        })
        datePickerDates.appendChild(dateElement);
    })
}


//when arrows are clicked to change months
prevMonthBtn.addEventListener('click', () => {
    currentDate = subMonths(currentDate, 1);
    setupDatePicker();
})
nextMonthBtn.addEventListener('click', () => {
    currentDate = addMonths(currentDate, 1);
    setupDatePicker();
})