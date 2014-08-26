Template.contacts.events({
	'click #contact-add-button': function(e) {
		Meteor.subscribe("searchUsers",$("#contacts-add-input").val());
	}
});
/*Meteor.call('upsertContactListWithContactByUserId',"5Rmj8Eq2GBns7d544",function(error){
	if(error){
		console.log(error);
		Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
	}else{
		Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
	}
});*/