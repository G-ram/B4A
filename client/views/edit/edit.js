Template.edit.events({
	'click #edit-save-button': function(e) {
		Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
	}
});