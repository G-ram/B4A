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
	'click .search-add-contact-button':function(e){
		Meteor.call('upsertContactListByUserId',e.currentTarget.id,function(error){
			if(error){
				console.log(error);
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong. :-(","red");
			}else{
				Template.navbar.hideSearch();
				Template.notification.changeAndDisplayNotificationWithHTML("Added contact!","green");
			}
		});
	},
	'keyup #navbar-mobile-search-input': function(e){
		if(e.keyCode == 27){
			Template.navbar.hideSearch();
		}else{
			if($("#navbar-mobile-search-input").val().length>1){
				Meteor.call('searchUsers',$("#navbar-mobile-search-input").val(),function(error, response){
					if(error){
						console.log(error);
					}else{
						if(!isNull(response)){
							Session.set('searchResults',response);
							$('#search-results-container').show();
						}else{
							Session.set('searchResults',[]);
							$('#search-results-container').show();
						}
					}
				});
			}else{
				$('#search-results-container').hide();
			}
		}
	}
});
Template.navbar.search = function(){
	if(!$("#navbar-mobile-search-button").hasClass('clicked')){
		$("#navbar-mobile-search-input-container").fadeIn( "slow");
		$("#navbar-mobile-search-input").val("");
		$("#navbar-mobile-search-input").focus();
		$("#navbar-mobile-search-button").animate({left: "+=70px",},1.0);
		$("#navbar-mobile-search-button").addClass("clicked");
	}else{
		Template.navbar.hideSearch();
	}
}
Template.navbar.hideSearch = function(){
	$("#search-results-container").fadeOut( "slow");
	$("#navbar-mobile-search-input-container").fadeOut( "slow");
	$("#navbar-mobile-search-input").blur();
	$("#navbar-mobile-search-button").animate({left: "-=70px",},1.0);
	$("#navbar-mobile-search-button").removeClass("clicked");
}
Template.search_results.helpers({
	getSearchResultFromSession: function(session){
		var context = Session.get(session);
		if(context){
			var result = [];
			_.each(context, function(value, key, list){
			    result.push({key:key, value:value});
			})
			return result;
		}
		return [];
	}
})