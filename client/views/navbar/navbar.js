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
	'click #navbar-search-button': function(e) {
		Template.navbar.toggleSearch();
	}
});
Template.navbar.toggleSearch = function(){

}