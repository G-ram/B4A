Template.login.events({
	'click #login-login-button': function(e) {
		var email = trimInput($('#login-email-input').val().toLowerCase());
		var password = $('#login-password-input').val();

        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password)) {
            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                	Template.notification.changeAndDisplayNotificationWithHTML("Password/Username not valid.","red");
                } else {
                    Template.notification.changeAndDisplayNotificationWithHTML("Welcome back!","green");
                    Router.go('home');
                }
            });
        }
		Template.notification.changeAndDisplayNotificationWithHTML("Logged in!","green");
	},
	'click #login-signup-button': function(e) {
		var email = trimInput($('#login-email-input').val().toLowerCase());
		var password = $('#login-password-input').val();

		if(isNotEmpty(email) && isNotEmpty(password) && isEmail(email)){
			Accounts.createUser({email: email, password: password}, function(err) {
				if (err){
					if (err.message === 'Email already exists. [403]') {
						Template.notification.changeAndDisplayNotificationWithHTML("This email is already in use.","yellow");
					}else{
						Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
					}
				}else{
					Template.notification.changeAndDisplayNotificationWithHTML("Welcome!","green");
					Router.go('edit');
				}
			});
		}
	},
	'click #login-facebook-button': function(e) {
		Meteor.loginWithFacebook({
			requestPermissions: ['public_profile', 'email', 'user_friends']
		}, function (err) {
			if (err){
				Template.notification.changeAndDisplayNotificationWithHTML("Something went wrong.:-(","red");
			}else{
				Template.notification.changeAndDisplayNotificationWithHTML("Welcome back!","green");
				Router.go('home');
			}
		});
	}
});