Template.edit.events({
	'click #edit-save-button': function(e) {
		Template.edit.updatePersonalInformation();
	}
});
Template.edit.updatePersonalInformation = function(){
	/*Meteor.call('updateFields',{
		firstName:$("#edit-first-name-input").val(),
		lastName:$("#edit-last-name-input").val(),
		business:$("#edit-business-input").val(),
		email:$("#edit-email-input").val(),
		phoneNumber:$("#edit-phone-number-input").val(),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});*/
	Meteor.call('upsertAccountWithObject',{
		type:"account",
		bankName:"JP Morgan Chase",
		routingNumber:"123",//$("#edit-account-routing-number-input").val(),
		accountNumber:"1234567890",//$("#edit-account-account-number-input").val(),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
	Meteor.call('consoleUser');
}
Template.edit_account.events({
	'click #edit-account-save-button': function(e){
		Template.edit_account.bankAccount();
	}
});
Template.edit_account.bankAccount = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"account",
		routingNumber:$("#edit-account-routing-number-input").val(),
		accountNumber:$("#edit-account-account-number-input").val(),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
}
Template.edit_credit.events({
	'click #edit-credit-save-button': function(e){
		Template.edit_credit.creditCard();
	}
});
Template.edit_credit.creditCard = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"credit",
		cardNumber:$("#edit-credit-card-number-input").val(),
		expirationDate:$("#edit-credit-expiraton-date-input").val(),
		securityCode:$("#edit-credit-security-code-input").val(),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
}
Template.edit_debit.events({
	'click #edit-debit-save-button': function(e){
		Template.edit_debit.debitCard();
	}
});
Template.edit_debit.debitCard = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"debit",
		cardNumber:$("#edit-debit-card-number-input").val(),
		expirationDate:$("#edit-debit-expiraton-date-input").val(),
		securityCode:$("#edit-debit-security-code-input").val(),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
}