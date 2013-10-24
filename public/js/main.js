// mock data
var events = [
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
		resultsTemplateData = {events: events};

$(".results").append(resultsTemplate(resultsTemplateData));

// load calendar
// kylestetz.github.io/CLNDR/
$('.event-calendar').clndr({
	template: $('#calendar-template').html(),
	startWithMonth: moment(),
	daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	events: events,
	clickEvents: {
		click: function(target){
			$('.today').removeClass('today');
			$(target.element).addClass('today');
		}
	},
	doneRendering: function(){
	},
	extras: {

	}
});

// load search queries to option elements
var searchQuery = [];
_.each(events, function(day){
	_.each(day.allEvents, function(event) {
		if (_.indexOf(searchQuery, event.title) == -1) {
			searchQuery.push(event.title);
		}
	});
});

var searchTemplate = _.template($("#searchbox-template").html()),
		searchTemplateData = {queries: searchQuery};

$("#searchbox").append(searchTemplate(searchTemplateData));

// trigger search suggestion plugin
$("#searchbox").chosen(
	{
		disable_search_threshold: 5,
		no_results_text: "Oops, no activity found!",
		width: "100%"
	}
	);
