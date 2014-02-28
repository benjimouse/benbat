var datesData = [
    {
        title: 'Introducing Telescope',
        author: 'Sacha Greif',
        url: 'http://sachagreif.com/introducing-telescope/'
    },
    {
        title: 'Meteor',
        author: 'Tom Coleman',
        url: 'http://meteor.com'
    },
    {
        title: 'The Meteor Book',
        author: 'Tom Coleman',
        url: 'http://themeteorbook.com'
    }
];
Template.datesList.helpers({
    date: function () {
        return Dates.find();
    }
});