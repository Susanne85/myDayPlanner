let currentDayDisplay = $('#currentDay');
let currentEventsDisplay = $('.container');
let saveBtn = '.saveBtn';

let todaysStartHrs = ['08','09','10','11','12','13','14','15','16','17'];
let todaysCalendarEventText = ['','','','','','','','','',''];

function displayEventsForToday() {
    let buttonItem, currentHr, currentStartHr='', i, pItem, pItem1, todaysDate;

    let myCalendar = {
        calendarHr: "",
        calendarText:""
    }

    todaysDate = moment();
    
    pItem = $('<p>').text = $("#currentDay").text(todaysDate.format("LLLL"));

    currentDayDisplay.append(pItem);   

    myCalendar = JSON.parse(localStorage.getItem("myCalendar"));

    if (myCalendar !== null) {
      for (i=0; i<10; i++){
        todaysStartHrs[i] = myCalendar.calendarHr[i];
        todaysCalendarEventText[i] = myCalendar.calendarText[i];
      }
    }

    let hourNow = moment();
    currentStartHr = hourNow.hour();
    
    for (i = 0; i < todaysStartHrs.length; i++){
        currentHr = todaysStartHrs[i];
         
        if (todaysStartHrs[i] < 12){
          currentHr = currentHr + ":00 am";
        } else if (todaysStartHrs[i] > 12) {
          currentHr = currentHr -12;
          currentHr = currentHr + ":00 pm";
        } else{
          currentHr = currentHr + ":00 pm";
        }
        if (todaysStartHrs[i] < currentStartHr){
         pItem1 = $('<input class= "description past" style="width:40vw" disabled="disabled">').val(todaysCalendarEventText[i]);
         buttonItem = $('<button class = "saveBtn" style="display:none">')
        } else {
            buttonItem = $('<button class = "saveBtn">').text('Save');
            if (todaysStartHrs[i] === currentStartHr.toString()){
              pItem1 = $('<input class= "description present" style="width:40vw">').val(todaysCalendarEventText[i]);
            } else{
              pItem1 = $('<input class= "description future" style="width:40vw">').val(todaysCalendarEventText[i]);
            }
        }

        pItem = $('<p class="hour" style="width:10vw">').text(currentHr);

        let row = $('<div class= "row">');

        row.append(pItem, pItem1, buttonItem);
        currentEventsDisplay.append(row);
   }
}

function saveEventToLocalStorage(event) {
  let arrayIndex, eventHr, newEventText, todaysEventHrs;
  
  let myCalendar = {
    calendarHr: "",
    calendarText:""
  };

  event.stopPropagation();
  eventHr = event.target.parentNode.children[0].outerText;

  todaysEventHrs = ['08:00 am','09:00 am','10:00 am','11:00 am','12:00 pm','1:00 pm','2:00 pm','3:00 pm','4:00 pm','5:00 pm'];
  
  arrayIndex = jQuery.inArray(eventHr, todaysEventHrs);

  if (arrayIndex != -1){
    newEventText = (event.target.parentNode.children[1].value).trim();
    if (todaysCalendarEventText[arrayIndex] === '' && newEventText === ''){
      confirm('Some text should be entered for the event description');
    } else {
      todaysCalendarEventText[arrayIndex] = (event.target.parentNode.children[1].value).trim();
      
      myCalendar.calendarHr = todaysStartHrs;
      myCalendar.calendarText = todaysCalendarEventText;

      localStorage.setItem("myCalendar", JSON.stringify(myCalendar));
    }
  }
}
// The funtion displayEvents for Today retrieves the events from the Users Local Storage and then displays the text associated with those
// events.  If the start time for that event is within the current hour then the event text box is red, those in the future are green
// and those in the past are grey and the user will not be able to enter or alter text.

displayEventsForToday ();

// The event listener listens for the click event on the save button, and executes the function saveEventToLocalStorage.

currentEventsDisplay.on('click', saveBtn, saveEventToLocalStorage);