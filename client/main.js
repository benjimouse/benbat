Session.setDefault('editing.calevent', null);
Session.setDefault('showEditEvent', false);

Meteor.Router.add({
    '/': 'homepage',
    '/calendar' : 'calendar'
});