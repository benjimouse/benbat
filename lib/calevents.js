CalEvents = new Meteor.Collection('calevents');
Meteor.startup(function () {
    'use strict';
    if (Meteor.isServer) {
        //On start up set the due date to be 2014 July 07
        if(CalEvents.find({'isDueDate': true}).count() > 1){
            CalEvents.remove({'isDueDate': true});
        }
        if(CalEvents.find({'isDueDate': true}).count() === 0){
            CalEvents.insert({'title': 'Due Date', 'start': new Date(2014, 6, 7, 0, 0, 0), 'end': new Date(2014, 6, 7, 0, 0, 0), 'isDueDate': true});
        }
    }
});