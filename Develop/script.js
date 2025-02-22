$(function () {
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // Display the current date in header of the page
  $(".saveBtn").on("click", function () {
    var text = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    // Set items to local storage
    localStorage.setItem(time, text);
  });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateHourClasses() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").replace("hour", ""));

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  // Function to load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var time = $(this).attr("id");
      var savedText = localStorage.getItem(time);

      if (savedText !== null) {
        $(this).find("discrioption").val(savedText);
      }
    });
  }

  // Initial calls

updateHourClasses(); 
loadSavedEvents();

setInterval(updateHourClasses, 60000);
  // TODO: Add code to display the current date in the header of the page.
    // Display current date in Header using Day.js
    var today = dayjs();
    $('#currentDay').text(today.format('MMM D, YYYY'));
});
