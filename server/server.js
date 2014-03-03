
Meteor.methods({
	'removeAll':function(){
		CalEvents.remove({});
	}
})