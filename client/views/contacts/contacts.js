Template.contacts_add.events({
	'click #contacts-save-button': function(e) {
		Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		history.back();
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