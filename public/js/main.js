var mockEvents = [
	{startDate: '2013-11-11',endDate: '2013-11-15', title:'Daily event', location: 'SMU', startTime: '8:00AM', endTime: '9:30AM', repeat: 'daily'},
	{startDate: '2013-11-11',endDate: '2014-02-22', title:'Monthly event', location: 'SMU', startTime: '12:00PM', endTime: '2:00PM', repeat: 'monthly'},
	{startDate: '2013-11-11',endDate: '2014-11-29', title:'Weekly event', location: 'Old Trafford', startTime: '4:00PM', endTime: '5:00PM', repeat: 'weekly'},
	{startDate: '2014-02-03',endDate: '2014-02-03', title:'Fishing trip', location: 'Toa Payoh', startTime: '8:00AM', endTime: '6:00PM', repeat: 'none' }
];

// create recurringDays array for recurring events
var recurringDays = [],
		temp = [];

for (var i = mockEvents.length - 1; i >= 0; i--) {
	var date = [];
	var duration = (moment(mockEvents[i].endDate) - moment(mockEvents[i].startDate))/(1000*60*60*24);

	date.push(parseInt(mockEvents[i].startDate.slice(0,4)),parseInt(mockEvents[i].startDate.slice(5,7))-1,parseInt(mockEvents[i].startDate.slice(-2)));

	if (mockEvents[i].repeat == 'weekly') {
		duration = Math.floor(duration/7);
	} else if (mockEvents[i].repeat == 'monthly') {
		duration = Math.floor(duration/(365/12));
	}

	for (var j = duration ; j >= 0; j--) {
		if (mockEvents[i].repeat == 'weekly') {
			var currentDate = moment(date).add('w',j);
		} else if (mockEvents[i].repeat == 'monthly') {
			var currentDate = moment(date).add('M',j);
		} else {
			var currentDate = moment(date).add('d',j);
		}

		var currentDateStr = currentDate.get('year')+'-'+(currentDate.get('month')+1)+'-'+currentDate.get('date');
		// if date hasn't exist, push into recurringDays array
		var currentDateIndex = _.indexOf(temp, currentDateStr);
		if (currentDateIndex == -1) {
			temp.push(currentDateStr);
			recurringDays.push({
				date: currentDateStr,
				allEvents: [
					{
						'title': mockEvents[i].title,
						'location': mockEvents[i].location,
						'startTime': mockEvents[i].startTime,
						'endTime': mockEvents[i].endTime
					}
				]
			});
		} else {
			recurringDays[currentDateIndex].allEvents.push({
				'title': mockEvents[i].title,
				'location': mockEvents[i].location,
				'startTime': mockEvents[i].startTime,
				'endTime': mockEvents[i].endTime
			});
		}
	};
};

var days = recurringDays;
test = recurringDays;

console.log(days);

// load results
var resultsTemplate = _.template($("#results-template").html()),
		resultsTemplateData = {days: days};

// var todayEventsTemplate = _.template($("#today-events-template").html());

// $(".results").append(resultsTemplate(resultsTemplateData));

// load calendar
// kylestetz.github.io/CLNDR/
theCalendarInstance = $('.event-calendar').clndr({
	template: $('#calendar-template').html(),
	startWithMonth: moment(),
	daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	events: days,
	clickEvents: {
		click: function(target){
			$('.today').removeClass('today');
			$(target.element).addClass('today');
			$('.current-event').remove();
			if (target.events[0] != undefined) {
				var updatedCurrentEvents = "";
				_.each(days, function (day) {
					if (target.events[0].date == day.date) {
						_.each(day.allEvents, function (event) {
							updatedCurrentEvents += '<div class="current-event"><h3 class="title">'+event.title+'</h3><p class="location">'+event.location+'</p><p class="time">'+event.startTime+' - '+event.endTime+'</p></div>';
						})
					}
				});
			}
			var temp = target.date._i.split('-');
			var targetDate = 'calendar-day-' + temp[0] + '-' + parseInt(temp[1]) + '-' + parseInt(temp[2]);
			var container = $('.event-list');
			var scrollTo = $('.event-list .' + targetDate);

			container.animate({
				scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
			}, 500);

			// $('.event-list').append(updatedCurrentEvents);
		}
	},
	doneRendering: function(){
		var daysWithEventsThisMonth = _.sortBy(this.eventsThisMonth, function (day) {
			return day._clndrDateObject;
		});

		$(".event-list").append(resultsTemplate({days: daysWithEventsThisMonth}));

		$('.event-list').on('click', 'remove-event', function (target) {

		})
	},
	extras: {

	}
});

///////////////////////
//// Searching ////////
///////////////////////

// load search queries to search box
var searchQuery = [];
_.each(days, function(day){
	_.each(day.allEvents, function(event) {
		if (_.indexOf(searchQuery, event.title) == -1) {
			searchQuery.push(event.title);
		}
	});
});

var searchTemplate = _.template($("#searchbox-template").html()),
		searchTemplateData = {queries: searchQuery};

$("#searchbox").append(searchTemplate(searchTemplateData));

var $events = $(".results .event"),
		$days = $(".results .date"),
		$calendarDays = $(".clndr-grid .day");

// Get all events' titles from each day and push them to an array
_.each(days, function (day) {
	var eventsOfTheDay = [];
	_.each(day.allEvents, function (event) {
		if (_.indexOf(eventsOfTheDay, event.title) == -1) {
			eventsOfTheDay.push(event.title);
		}
	});
	day.eventsOfTheDay = eventsOfTheDay;
});

// trigger search suggestion plugin
// http://harvesthq.github.io/chosen/
$("#searchbox")
	.chosen({
		disable_search_threshold: 5,
		no_results_text: "Oops, no activity found!",
		width: "100%"
	})
	.change(function(){
		var selectedActivities = $("#searchbox").val();

		// filter results and calendar using the selectedActivities
		if (selectedActivities == null) {
			// reset results
			$(".results .event").removeClass("hide");
			$(".results .date").removeClass("hide");

			// reset calendar
			$(".clndr-grid .day").removeClass("blur-day");
		} else {
			$(".results .event").removeClass("hide");
			$(".results .date").removeClass("hide");

			$(".clndr-grid .day").removeClass("blur-day");

			unselectedActivities = _.difference(searchQuery, selectedActivities);

			// blur days without events on calendar
			$(".clndr-grid .day").each(function () {
				if ($(this).hasClass("event") == false) {
					$(this).addClass("blur-day");
				}
			});

			// blur days without selected events on calendar
			_.each(days, function (day) {
				var selectedEventExists = _.intersection(day.eventsOfTheDay, selectedActivities);
				if (selectedEventExists.length == 0) {
					$(".calendar-day-" + day.date).addClass('blur-day');
				}
			})

			// hide unselected activities
			_.each(unselectedActivities, function (activity) {
				$("."+activity).addClass("hide");
			});

			// Remove the date if all events within that date is hidden
			$days.each(function(){
				var emptyDate = false;
				$(this).find(".event").each(function () {
					if ($(this).hasClass("hide")) {
						emptyDate = true;
					} else {
						emptyDate = false;
						return false;
					}
				});

				if (emptyDate == true) {
					$(this).addClass("hide");
				}
			})
		}
	});