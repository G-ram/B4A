Template.footer.events({
	'click #footer-logout-link': function(e) {
		Meteor.logout(function() {
            Template.notification.changeAndDisplayNotificationWithHTML("Logged out. See ya!","green");
        });
	}
});