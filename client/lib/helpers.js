//Handlebar helpers
UI.registerHelper('isEqual', function(value1, value2){
    if(value1 == value2){
        return true;
    }
    return false;
});
UI.registerHelper('isNull', function(value){
    if(value == 0 || value == "0" || value == "null" || value == null || value == ""){
        return true;
    }
    return false;
});
UI.registerHelper('console', function(value){
    return console.log(value);
});
UI.registerHelper('getSession', function(value){
    return Session.get(value);
});
UI.registerHelper('isNullWithValue', function(value,placeholder){
	if(value == 0 || value == "0" || value == "null" || value == null || value == ""){
		return placeholder;
	}
	return value;
});
Handlebars.registerHelper('getKeyAndValue', function(context, options) {
  var result = [];
  _.each(context, function(value, key, list){
    result.push({key:key, value:value});
  })
  return result;
});
//Javascript helpers
isNull = function(value){
    if(value == 0 || value == "0" || value == "null" || value == null){
        return true;
    }
    return false;
};
isEqual = function(value1, value2){
    if(value1 == value2){
        return true;
    }
    return false;
};
trimInput = function(value){
    return value.replace(/^\s*|\s*$/g, '');
};
isNotEmpty = function(value){
    if (value && value !== ''){
        return true;
    }
    return false;
};
isEmail = function(value){
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(value)) {
        return true;
    }
    return false;
};
isPhoneNumber = function(value){

};
isValidPassword = function(password){
    if (password.length < 6){
        return false;
    }
    return true;
};
areValidPasswords = function(password, confirm){
    if (!isValidPassword(password)){
        return false;
    }
    if (password !== confirm){
        return false;
    }
    return true;
};