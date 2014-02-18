var mockEvents = [
	{startDate: '2014-02-11',endDate: '2014-02-15', title:'Daily event', location: 'SMU', time: '8:00AM', repeat: 'daily'},
	{startDate: '2013-11-11',endDate: '2014-03-20', title:'Monthly event', location: 'SMU', time: '12:00PM', repeat: 'monthly'},
	{startDate: '2014-02-01',endDate: '2014-03-29', title:'Weekly event', location: 'SMU', time: '16:00PM', repeat: 'weekly'}
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
						'time': mockEvents[i].time
					}
				]
			});
		} else {
			recurringDays[currentDateIndex].allEvents.push({
				'title': mockEvents[i].title,
				'location': mockEvents[i].location,
				'time': mockEvents[i].time
			});
		}
	};
};

var days = recurringDays;
// create an array of dates with no recurring events
// var days = [
// 		{
// 			date: '2013-10-19',
// 			allEvents: [
// 				{
// 					'title':'Red',
// 					'location':'SMU',
// 					'time':'8:00AM'
// 				}
// 			]
// 		},
// 		{
// 			date: '2013-10-27',
// 			allEvents: [
// 				{
// 					'title':'Red',
// 					'location':'SMU',
// 					'time':'8:00AM'
// 				},
// 				{
// 					'title':'Orange',
// 					'location':'Kallang',
// 					'time':'16:00PM'
// 				}
// 			]
// 		},
// 		{
// 			date: '2013-10-23',
// 			allEvents: [
// 				{
// 					'title':'Red',
// 					'location':'SMU',
// 					'time':'8:00AM'
// 				},
// 				{
// 					'title':'Green',
// 					'location':'Kallang',
// 					'time':'12:00PM'
// 				},
// 				{
// 					'title':'Blue',
// 					'location':'SMU',
// 					'time':'16:00PM'
// 				}
// 			]
// 		},
// 		{
// 			date: '2013-10-25',
// 			allEvents: [
// 				{
// 					'title':'Red',
// 					'location':'SMU',
// 					'time':'8:00AM'
// 				},
// 				{
// 					'title':'Green',
// 					'location':'City Hall',
// 					'time':'12:00PM'
// 				}
// 			]
// 		},
// 		{
// 			date: '2013-10-28',
// 			allEvents: [
// 				{
// 					'title':'Red',
// 					'location':'SMU',
// 					'time':'8:00AM'
// 				},
// 				{
// 					'title':'Green',
// 					'location':'SMU',
// 					'time':'12:00PM'
// 				},
// 				{
// 					'title':'Blue',
// 					'location':'SMU',
// 					'time':'16:00PM'
// 				},
// 				{
// 					'title':'Yellow',
// 					'location':'Bugis',
// 					'time':'19:00PM'
// 				},
// 				{
// 					'title':'Orange',
// 					'location':'Home',
// 					'time':'21:00PM'
// 				}
// 			]
// 		},
// 		{
// 			date: '2013-10-31',
// 			allEvents: [
// 				{
// 					'title':'Green',
// 					'location':'SMU',
// 					'time':'12:00PM'
// 				},
// 				{
// 					'title':'Blue',
// 					'location':'SMU',
// 					'time':'16:00PM'
// 				},
// 				{
// 					'title':'Yellow',
// 					'location':'Raffles City',
// 					'time':'19:00PM'
// 				},
// 				{
// 					'title':'Orange',
// 					'location':'Dhoby Ghaut',
// 					'time':'21:00PM'
// 				}
// 			]
// 		}
// 	];

// load results
var resultsTemplate = _.template($("#results-template").html()),
		resultsTemplateData = {days: days};

// var todayEventsTemplate = _.template($("#today-events-template").html());

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
			console.log(target.events[0].allEvents);
			$('.today').removeClass('today');
			$(target.element).addClass('today');
			$('.current-event').remove();
			if (target.events[0] != undefined) {
				var updatedCurrentEvents = "";
				_.each(days, function (day) {
					if (target.events[0].date == day.date) {
						_.each(day.allEvents, function (event) {
							updatedCurrentEvents += '<div class="current-event"><h3 class="title">'+event.title+'</h3><p class="location">'+event.location+'</p><p class="time">'+event.time+'</p></div>';
						})
					}
				});
			}
			$('.event-list').append(updatedCurrentEvents);
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
console.log(days[0]);
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
					var tempDate = day.date.split('-');

					var dateStringFormat = function (string) {
						if (parseInt(string) < 10) {
							string = '0'+string;
						}
						return string;
					}
					$(".calendar-day-"+tempDate[0]+'-'+dateStringFormat(tempDate[1])+'-'+dateStringFormat(tempDate[2])).addClass('blur-day');
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