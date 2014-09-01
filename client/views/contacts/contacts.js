Template.contacts.events({
	'click #contact-add-button': function(e) {
		if(!$("#navbar-mobile-search-button").hasClass('clicked')){
			Template.navbar.search();
		}else{
			Template.navbar.hideSearch();
		}
	}
});