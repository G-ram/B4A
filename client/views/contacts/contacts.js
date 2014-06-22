Template.contacts_add.events({
	'click #contacts-save-button': function(e) {
		Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
	}
});