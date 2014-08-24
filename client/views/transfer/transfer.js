var supportedCurrencies = {
	dollar: "$",
	euro: "&euro;",
	yen: "&yen;",
	pound: "&pound;"
};
transaction = {
	to:{
		userId:null,
		userName:null
	},
	from:{
		bankId:null,
		bankName:null
	},
	amount: 0,
	currency: "dollar"
}
Template.transfer.returnSupportedCurrencies = function(){
	return supportedCurrencies;
};
Template.transfer.events({
	'click .transfer-currency-link': function(e){
		$("#transfer-currency-dropdown-current").html(supportedCurrencies[e.currentTarget.getAttribute("currencyKey")]);
		transaction.currency = 	e.currentTarget.getAttribute("currencyKey");
	},
	'click #transfer-from-button': function(e) {
		$("#transfer-list-accounts-container").show('slide', {direction : 'down'}, 500); 
	},
	'click #transfer-to-button': function(e) {
		$("#transfer-list-contacts-container").show('slide', {direction : 'down'}, 500); 
	},
	'click .transfer-close-button': function(e){
		$(".transfer-popup-container").hide('slide', {direction : 'down'}, 500);
	},
	'click .linked-accounts-account-record': function(e){
		if(isNull(e.currentTarget.getAttribute("bankName"))){
			$("#transfer-from-span").html("No Bank Name");
		}else{
			$("#transfer-from-span").html(e.currentTarget.getAttribute("bankName"));
		}
		transaction.from.bankId = e.currentTarget.getAttribute("bankId");
		transaction.from.bankName = e.currentTarget.getAttribute("bankName");
		$(".transfer-popup-container").hide('slide', {direction : 'down'}, 500);
	},
	'click #transfer-confirm-button':function(e){
		var amount = parseInt($("#transfer-dollars-input").val())+parseInt($("#transfer-cents-input").val())/100;
		transaction.amount = amount;
		Session.set("transaction",transaction);
	}
});
Template.transfer_confirm.events({
	'click #transfer-confirm-confirm-button': function(e){
		Template.transfer_confirm.registerTransaction();
	}
});
Template.transfer_confirm.registerTransaction = function(){
	Meteor.call('registerTransaction',Session.get("transaction"),function(error){
		if(error){
			console.log(error);
			Template.notification.changeAndDisplayNotificationWithHTML("Transaction was Not registered. :-(","red");
		}else{
			Template.notification.changeAndDisplayNotificationWithHTML("Transaction sent. Check bank activity.","green");
		}
	});
}
UI.registerHelper('returnTransaction', function(){
    if(Session.get("transaction").amount){
    	return Session.get("transaction");
	}
	return null;
});
UI.registerHelper('getCurrencySymbol', function(){
    if(Session.get("transaction").currency){
    	return new Handlebars.SafeString(supportedCurrencies[Session.get("transaction").currency]);
	}
	return "$";
});
UI.registerHelper('returnTransactionDollars', function(){
    if(Session.get("transaction").amount){
    	return Session.get("transaction").amount.toString().split(".")[0];
	}
	return null;
});
UI.registerHelper('returnTransactionCents', function(){
	if(Session.get("transaction").amount){
    	return Session.get("transaction").amount.toString().split(".")[1];
	}
	return null;
});