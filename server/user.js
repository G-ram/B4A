Accounts.onCreateUser(function (options, user) {
    var emptyArray = [],
        result;
    if(user.services.facebook){
    	var accessToken = user.services.facebook.accessToken;
	    result = Meteor.http.get("https://graph.facebook.com/me/picture?redirect=false&height=200&type=normal&width=200", {
	        params: {
	            access_token: accessToken,
	        }
	    });
	    if(result.error){
	    	console.log(result)
	    }else{
		    user.firstName = user.services.facebook.first_name;
		    user.lastName = user.services.facebook.last_name;
		    user.email = user.services.facebook.email;
		    user.profilePicUrl = result.data.data.url;
		    user.contactList = emptyArray; //Dictionary - Query facebook friends
		}
	}else{
		user.firstName = "0";
	    user.lastName = "0";
	    user.profilePicUrl = "0";
	    user.contactList = emptyArray;
	}
	user.business = "null";
	user.phoneNumber = "null";
	user.balance = 0;
	user.bankList = emptyArray; //Dictionary
	user.bankActivity = emptyArray; //Dictionary
	console.log(user);
    return user;
});
//Stop the user from modifying anything directly from the client
Meteor.users.deny({
  insert: function(userId, doc){
    return true;
  },
  update: function(userId, doc, fields, modifier) {
    return true;
  },
  remove: function(userId, doc){
    return true;
  }
});