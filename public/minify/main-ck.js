// $.ajax({
// 		url: './json/events.json',
// 		type: 'GET',
// 		dataType: 'json',
// 		success: function (data) {
// 			var events = [data];
// 			$('.event-calendar').clndr({
// 				template: $('#calendar-template').html(),
// 				startWithMonth: moment(),
// 				daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
// 				events: events,
// 				clickEvents: {
// 					click: function(target){
// 						$('.today').removeClass('today');
// 						$(target.element).addClass('today');
// 					}
// 				},
// 				doneRendering: function(){
// 				},
// 				extras: {
// 				}
// 			});
// 		}
// 	});
var events=[{date:"2013-10-19",allEvents:[{title:"Red",location:"SMU",time:"8:00AM"}]},{date:"2013-10-23",allEvents:[{title:"Red",location:"SMU",time:"8:00AM"},{title:"Green",location:"SMU",time:"12:00PM"},{title:"Blue",location:"SMU",time:"16:00PM"}]},{date:"2013-10-25",allEvents:[{title:"Red",location:"SMU",time:"8:00AM"},{title:"Green",location:"SMU",time:"12:00PM"}]},{date:"2013-10-28",allEvents:[{title:"Red",location:"SMU",time:"8:00AM"},{title:"Green",location:"SMU",time:"12:00PM"},{title:"Blue",location:"SMU",time:"16:00PM"},{title:"Yellow",location:"SMU",time:"19:00PM"},{title:"Orange",location:"SMU",time:"21:00PM"}]},{date:"2013-10-31",allEvents:[{title:"Green",location:"SMU",time:"12:00PM"},{title:"Blue",location:"SMU",time:"16:00PM"},{title:"Yellow",location:"SMU",time:"19:00PM"},{title:"Orange",location:"SMU",time:"21:00PM"}]}];$(".event-calendar").clndr({template:$("#calendar-template").html(),startWithMonth:moment(),daysOfTheWeek:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],events:events,clickEvents:{click:function(e){$(".today").removeClass("today");$(e.element).addClass("today")}},doneRendering:function(){},extras:{}});