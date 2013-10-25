// mock data
var days = [
		{
			date: '2013-10-19',
			allEvents: [
				{
					'title':'Red',
					'location':'SMU',
					'time':'8:00AM'
				}
			]
		},
		{
			date: '2013-10-23',
			allEvents: [
				{
					'title':'Red',
					'location':'SMU',
					'time':'8:00AM'
				},
				{
					'title':'Green',
					'location':'Kallang',
					'time':'12:00PM'
				},
				{
					'title':'Blue',
					'location':'SMU',
					'time':'16:00PM'
				}
			]
		},
		{
			date: '2013-10-25',
			allEvents: [
				{
					'title':'Red',
					'location':'SMU',
					'time':'8:00AM'
				},
				{
					'title':'Green',
					'location':'City Hall',
					'time':'12:00PM'
				}
			]
		},
		{
			date: '2013-10-28',
			allEvents: [
				{
					'title':'Red',
					'location':'SMU',
					'time':'8:00AM'
				},
				{
					'title':'Green',
					'location':'SMU',
					'time':'12:00PM'
				},
				{
					'title':'Blue',
					'location':'SMU',
					'time':'16:00PM'
				},
				{
					'title':'Yellow',
					'location':'Bugis',
					'time':'19:00PM'
				},
				{
					'title':'Orange',
					'location':'Home',
					'time':'21:00PM'
				}
			]
		},
		{
			date: '2013-10-31',
			allEvents: [
				{
					'title':'Green',
					'location':'SMU',
					'time':'12:00PM'
				},
				{
					'title':'Blue',
					'location':'SMU',
					'time':'16:00PM'
				},
				{
					'title':'Yellow',
					'location':'Raffles City',
					'time':'19:00PM'
				},
				{
					'title':'Orange',
					'location':'Dhoby Ghaut',
					'time':'21:00PM'
				}
			]
		}
	];

// load results
var resultsTemplate = _.template($("#results-template").html()),
		resultsTemplateData = {days: days};

$(".results").append(resultsTemplate(resultsTemplateData));

// load calendar
// kylestetz.github.io/CLNDR/
$('.event-calendar').clndr({
	template: $('#calendar-template').html(),
	startWithMonth: moment(),
	daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	events: days,
	clickEvents: {
		click: function(target){
			$('.today').removeClass('today');
			$(target.element).addClass('today');
			// console.log(target);
		}
	},
	doneRendering: function(){
	},
	extras: {

	}
});

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
			$events.removeClass("hide");
			$days.removeClass("hide");

			// reset calendar
			$calendarDays.removeClass("blur-day");
		} else {
			$events.removeClass("hide");
			$days.removeClass("hide");

			$calendarDays.removeClass("blur-day");

			unselectedActivities = _.difference(searchQuery, selectedActivities);

			// blur unselected days on calendar
			$calendarDays.each(function () {
				if ($(this).hasClass("event") == false) {
					$(this).addClass("blur-day");
				}
			});

			_.each(days, function (day) {
				var selectedEventExists = _.intersection(day.eventsOfTheDay, selectedActivities);
				if (selectedEventExists.length == 0) {
					$("#calendar-day-" + day.date).addClass('blur-day');
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
