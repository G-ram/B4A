Template.notification.state = false;
Template.notification.color = "green";
Template.notification.timer;
Template.notification.events({
	'click #notification-container': function(e) {
		$("#notification-container").hide();
		Template.notification.state = false;
		clearTimeout(Template.notification.timer);
	}
});
Template.notification.changeAndDisplayNotificationWithHTML = function(html,color){
	if(Template.notification.state){
		clearTimeout(Template.notification.timer);
		$("#notification-container").removeClass(Template.notification.color);
	}
	Template.notification.state = true;
	Template.notification.color = color;
	$("#notification-container").html(html);
	$("#notification-container").show('slide', {direction : 'up'}, 200); 
	$("#notification-container").addClass(Template.notification.color);
	Template.notification.timer = setTimeout(function(){
		Template.notification.state = false;
		$("#notification-container").removeClass(Template.notification.color);
	    $('#notification-container').toggle();
	}, 3000);
}