Template.transfer.events({
	'click #transfer-from-button': function(e) {
		$("#transfer-list-accounts-container").show('slide', {direction : 'down'}, 500); 
	},
	'click #transfer-to-choose-button': function(e) {
		$("#transfer-list-contacts-container").show('slide', {direction : 'down'}, 500); 
	},
	'click #transfer-to-plus-button': function(e){
		$("#transfer-add-contact-container").show('slide', {direction : 'down'}, 500); 
	},
	'click .transfer-close-button': function(e){
		$(".transfer-popup-container").hide('slide', {direction : 'down'}, 500);
	}
});