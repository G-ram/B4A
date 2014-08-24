Template.edit.events({
	'click #edit-save-button': function(e) {
		Template.edit.updatePersonalInformation();
	},
	'click #linked-accounts-add-account-button': function(e) {
		Session.set("bankId",false);
	},
	'click .linked-accounts-account-record': function(e){
		Session.set("bankId",e.currentTarget.getAttribute("bankId"));
		Router.go(e.currentTarget.getAttribute("editPath"));
	}
});
Template.edit.updatePersonalInformation = function(){
	Meteor.call('updateFields',{
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
	});
};
Template.edit_account.events({
	'click #edit-account-save-button': function(e){
		Template.edit_account.bankAccount();
	},
	'click #edit-account-delete-button':function(e){
		Template.edit_account.deleteBankAccount();
	}
});
Template.edit_account.bankAccount = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"account",
		routingNumber:$("#edit-account-routing-number-input").val(),
		accountNumber:$("#edit-account-account-number-input").val(),
		bankId:Session.get("bankId"),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
};
Template.edit_account.deleteBankAccount = function(){
	Meteor.call('deleteAccountWithId',Session.get('bankId'),function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Deleted.","yellow");
		}
	});
};
Template.edit_credit.events({
	'click #edit-credit-save-button': function(e){
		Template.edit_credit.creditCard();
	},
	'click #edit-credit-delete-button':function(e){
		Template.edit_credit.deleteCreditCard();	
	}
});
Template.edit_credit.creditCard = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"credit",
		cardNumber:$("#edit-credit-card-number-input").val(),
		expirationDate:$("#edit-credit-expiraton-date-input").val(),
		securityCode:$("#edit-credit-security-code-input").val(),
		bankId:Session.get("bankId"),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
};
Template.edit_credit.deleteCreditCard = function(){
	Meteor.call('deleteAccountWithId',Session.get('bankId'),function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Deleted.","yellow");
		}
	});
};
Template.edit_debit.events({
	'click #edit-debit-save-button': function(e){
		Template.edit_debit.debitCard();
	},
	'click #edit-debit-delete-button':function(e){
		Template.edit_debit.deleteDebitCard();
	}
});
Template.edit_debit.debitCard = function(){
	Meteor.call('upsertAccountWithObject',{
		type:"debit",
		cardNumber:$("#edit-debit-card-number-input").val(),
		expirationDate:$("#edit-debit-expiraton-date-input").val(),
		securityCode:$("#edit-debit-security-code-input").val(),
		bankId:Session.get("bankId"),
		},function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Saved.","green");
		}
	});
};
Template.edit_debit.deleteDebitCard = function(){
	Meteor.call('deleteAccountWithId',Session.get('bankId'),function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Deleted.","yellow");
		}
	});
};