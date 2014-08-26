//Back button hide/show
Router.onBeforeAction(function(){
  if(Router.current().path === "/"){
    $("#navbar-back-button-container").hide();
  }else{
    $("#navbar-back-button-container").show();
  }
});
//Search button
Template.navbar.events({
	'click #navbar-mobile-search-button': function(e) {
		Template.navbar.search();
	},
	'click #navbar-mobile-search-cancel-button': function(e){
		Template.navbar.hideSearch();
	},
	'keypress #navbar-mobile-search-input': function(e){
		if($("#navbar-mobile-search-input").val().length>2){
			Meteor.subscribe('searchUsers',$("#navbar-mobile-search-input").val()).forEach(function(doc){ 
				console.log(doc.firstName);
			});
		}
	}
});
Template.navbar.search = function(){
	if(!$("#navbar-mobile-search-button").hasClass('clicked')){
		$("#navbar-mobile-search-input-container").fadeIn( "slow");
		$("#navbar-mobile-search-input").focus();
		$("#navbar-mobile-search-button").animate({left: "+=70px",},1.0);
		$("#navbar-mobile-search-button").addClass("clicked");
	}else{

	}
}
Template.navbar.hideSearch = function(){
	$("#navbar-mobile-search-input-container").fadeOut( "slow");
	$("#navbar-mobile-search-input").blur();
	$("#navbar-mobile-search-button").animate({left: "-=70px",},1.0);
	$("#navbar-mobile-search-button").removeClass("clicked");
}