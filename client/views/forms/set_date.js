$(function () {
    'use strict';
    $("#arrivalDate").datepicker();
});

function validateDate(validDate) {
    'use strict';
    if (Dates.findOne({arrivalDate : validDate})) {
        return ['Date already exists', 'please try again'];
    }
    return [];
}

Template.setDate.events = {
    'blur input[type=date]': function (e) {
        'use strict';
    },
    'submit': function (e) {
        'use strict';
        if ($(e.srcElement).attr('id') === 'dateSetting') {
            e.preventDefault();
            var errMsgs = validateDate($('#arrivalDate').val());
            if (errMsgs.length === 0) {
                Dates.insert({
                    name : $('#name').val(),
                    arrivalDate : $('#arrivalDate').val()
                });
            } else {
                alert(errMsgs.join('\n'));
            }
        }
    }
};