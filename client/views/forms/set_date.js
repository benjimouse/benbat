Template.setDate.events = {
    'click input[type=submit]': function (e) {
        e.preventDefault();
        Dates.insert({
            name : $('#name').val(),
            arrivalDate : $('#arrivalDate').val()
        });
    }
};