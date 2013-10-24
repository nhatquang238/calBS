<div class="main-calendar col-md-8">
  <!-- Calendar Control -->
  <div class="clndr-controls clearfix">
    <div class="clndr-previous-button col-md-2"><span class="glyphicon glyphicon-chevron-left"></span></div>
    <div class="month col-md-8"><%= month %></div>
    <div class="clndr-next-button col-md-2"><span class="glyphicon glyphicon-chevron-right"></span></div>
  </div>

  <!-- Calendar Grid -->
  <div class="clndr-grid">
    <div class="days-of-the-week clearfix">
      <% _.each(daysOfTheWeek, function(day) { %>
        <div class="header-day"><%= day %></div>
      <% }); %>
    </div>
    <div class="days clearfix">
      <% console.log(days[0]);
      _.each(days, function(day) {
        if (day.events[0]) {
          var numberOfEvents = day.events[0].allEvents.length;
          // var dayClass = day.classes;
          switch(numberOfEvents) {
            case 1:
              // day.classes = dayClass + " 20percent";
              day.subClass = "20percent";
              break;
            case 2:
              // day.classes = dayClass + " 40percent";
              day.subClass = "40percent";
              break;
            case 3:
              // day.classes = dayClass + " 60percent";
              day.subClass = "60percent";
              break;
            case 4:
              // day.classes = dayClass + " 80percent";
              day.subClass = "80percent";
              break;
            case 5:
              // day.classes = dayClass + " full";
              day.subClass = "full";
              break;
          }
        } %>
        <div class="<%= day.classes %>" id="<%= day.id %>"><%= day.day %><span class="<%= day.subClass %>"></span></div>
      <% }); %>
    </div>
  </div>
</div>

<div class="today-event-container col-md-4">
  <h2 class="events-today">Current day events</h2>
  <div class="event-list">
    <% var today = moment().year() + "-" + (moment().month() + 1) + "-" + moment().date();
      _.each(days, function(day) {
      if (today == day.id.slice(13)) {
        _.each(day.events[0].allEvents, function(event) { %>
         <h3 class="title"><%= event.title %></h3>
         <p class="location"><%= event.location %></p>
         <p class="time"><%= event.time %></p>
        <% })
       };
    }) %>
  </div>
</div>