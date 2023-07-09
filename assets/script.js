const localeSettings = {};
dayjs.locale(localeSettings);

// Function is called after DOM elements loaded.
  $(function () {
    
    //Var retrieves current hour from Day.JS library 
    const currentHour = dayjs().format('H');

    // Today's Time + Date
    function currentTime() {
  // Connecting to the HTML ID elements for time and date
      const dateElement = $('#date');
      const timeElement = $('#time');
  
  // Variable calling Day.JS library + formatting
      const currentDate = dayjs().format('MMMM D, YYYY');
      const currentTime = dayjs().format('hh:mm A');
  
  // Display library data + formatting in HTML variable
      dateElement.text(currentDate);
      timeElement.text(currentTime);
    }

  // Toggle Time Block Color Change Based on Time 
    function hourlyColor() {
      $('.time-block').each(function() {
        const blockHour = parseInt(this.id);
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  // The  function below will save the user's input in a textarea to localStorage - only when the corresponding save button has been clicked.
    function textEntry() {
      $('.saveBtn').on('click', function() {
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // Toggle each element with a .time-block to modify class based on time of day
    function refreshColor() {
  // For each HTML element with a time block class 
      $('.time-block').each(function() {
  
        const blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    // This will get the user input from the localStorage and set textarea values for each time block.
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
    
    // Call the three main functions to set up the page.
    hourlyColor();
    textEntry();                
    refreshColor();
    
    // Excute + Update Current Time Every One Second
    setInterval(currentTime, 1000);
  });