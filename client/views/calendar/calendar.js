Template.calendar.rendered = function () {
    'use strict';
    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {
        },
        eventClick: function (calEvent, jsEvent, view) {
        },
        events: function (start, end, callback) {
            var events = [],
            calEvents = CalEvents.find();
            calEvents.forEach(function(e) {
                events.push({
                    id:e._id,
                    title:e.title,
                    start:e.start,
                    end:e.end                
                });
            });
            callback(events);
        }
        
    });
                                
};