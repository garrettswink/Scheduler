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


  // Called once to set the color of the blockHour elements based initial load time from currentHour var.
    function colorTime() {
  // For each element with a class of time-block...
      $('.time-block').each(function() {
  // Variable to parse string and return integer on current object
        const blockHour = parseInt(this.id);
  /*Toggle the class of the current object to past, present of future,
  using logical operators comparing the current time provided by the
  currentHour Var to the parsed integer provided by the
  current object ID, thereby setting the color.*/
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  

// Updates color/class based on the current time when user saves
function colorRefresh() {
      // For each HTML element with a time block class... 
          $('.time-block').each(function() {
  // Like the colorTime function, var parses out ID integer...
            const blockHour = parseInt(this.id);
  // And compares it to the current time...
            if (blockHour == currentHour) {
  // Updating the class to the present class if the values are equal...
              $(this).removeClass('past future').addClass('present');
  // Or adjusting the class to past if less than the current time
            } else if (blockHour < currentHour) {
              $(this).removeClass('future present').addClass('past');
  // Or updating the object to the future as the last possible scenario
            } else {
              $(this).removeClass('past present').addClass('future');
            }
          });
        }

    function textEntry() {
  // When the save button is clicked...
      $('.saveBtn').on('click', function() {
    
        const key = $(this).parent().attr('id');
        const value = $(this).siblings('.description').val();
        localStorage.setItem(key, value);
      });
    }
   // Toggle each element with a .time-block to modify class based on time of day
   
    // This will get the user input from the localStorage and set textarea values for each time block.
    $('.time-block').each(function() {
      const key = $(this).attr('id');
      const value = localStorage.getItem(key);
      $(this).children('.description').val(value);
    });
  
  
    // Call functions
    colorTime();
    textEntry();                
    colorRefresh();
    
    // Excute + Update Current Time Every One Second
    setInterval(currentTime, 1000);
  });