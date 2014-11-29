//TODO: Find a better way of controlling this, the session stuff feels wrong.
Session.setDefault('editing_calevent', null);
Session.setDefault('showEditEvent', false);
Session.setDefault('creating_calevent', null);
Session.setDefault('showNewEvent', false);
Session.setDefault('lastMod', null);


Template.calendar.showNewEvent = function () {
    return Session.get('showNewEvent');
}

Template.newEvent.evt = function () {
    var calEvent = Session.get('creating_calevent');
    calEvent.formattedDate = $.datepicker.formatDate('MM dd, yy', calEvent.date);
    return calEvent;
}

Template.calendar.showEditEvent = function () {
    return Session.get('showEditEvent');
}
Template.editEvent.evt = function () {
    var calEvent = CalEvents.findOne({
        _id: Session.get('editing_calevent')
    });
    return calEvent
}
Template.calendar.lastMod = function () {
    return Session.get('lastMod');
}
Template.editEvent.events({
    'click .save': function (evt, tmpl) {
        updateCalEvent(Session.get('editing_calevent'), tmpl.find('.title').value);
        Session.set('editing_event', null);
        Session.set('showEditEvent', false);
        Session.set('lastMod', new Date());
    }
})
Template.calendar.rendered = function () {
    var dueEvt = CalEvents.findOne({
        'isDueDate': true
    });
    var startYear = new Date().getFullYear(), 
    startMonth = new Date().getMonth();
    if (dueEvt !== undefined) {
        startYear = dueEvt.start.getFullYear();
        startMonth = dueEvt.start.getMonth();
    }
    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {
            console.log('dayClick');
            if (CalEvents.findOne({
                'start': date
            })) {
                alert('There is already a guess for that day, you can\'t have two guesses on one day.')
            } else {
                Session.set('creating_calevent', {
                    'date': date
                });
                console.log(Session.get('creating_calevent'));
                Session.set('showNewEvent', true);
            }

            //CalEvents.insert({title:'New Event',start:date,end:date});
            //Session.set('lastMod',new Date());
        },
        eventClick: function (calEvent, jsEvent, view) {
            Session.set('editing_calevent', calEvent.id);
            Session.set('showEditEvent', true);

        },
        eventDrop: function (calEvent) {
            //TODO: Validation (is the right person, doesn't already have a guess
            CalEvents.update(calEvent.id, {
                $set: {
                    start: calEvent.start,
                    end: calEvent.end
                }
            });
            Session.set('lastMod', new Date());
        },
        events: function (start, end, callback) {
            var events = [];
            calEvents = CalEvents.find();
            calEvents.forEach(function (evt) {
                events.push({
                    id: evt._id,
                    title: evt.title,
                    start: evt.start,
                    end: evt.end
                });

            })
            callback(events);
        }, 
        //set the week to start on Monday
        firstDay: 1,
        //Set the date to have as the default
        year: startYear,
        month: startMonth,
        editable: true
    });
}

var updateCalEvent = function (id, title) {
    CalEvents.update(id, {
        $set: {
            title: title
        }
    });
    return true;
}