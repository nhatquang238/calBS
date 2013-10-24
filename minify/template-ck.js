<%

var today = moment().year() + "-" + (moment().month() + 1) + "-" + moment().date();

  _.each(days, function(day) {
  if (today == day.id.slice(13) && day.events[0]) {
    _.each(day.events[0].allEvents, function(event) {

%>
     <h3 class="title"><%= event.title %></h3>
     <p class="location"><%= event.location %></p>
     <p class="time"><%= event.time %></p>
<%
      })
   };
})
%>