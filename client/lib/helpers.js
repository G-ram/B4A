//Handlebar helpers
UI.registerHelper('isEqual', function(value1, value2){
    if(value1 == value2){
        return true;
    }
    return false;
});
UI.registerHelper('isNull', function(value){
    if(value == 0 || value == "0" || value == "null" || value == null || value == "" || value.length == 0){
        return true;
    }
    return false;
});
UI.registerHelper('console', function(value){
    return console.log(value);
});
UI.registerHelper('setSession',function(session,value){
    if(typeof value != 'undefined'){
        Session.set(session,value);
    }
});
UI.registerHelper('getSession', function(value){
    return Session.get(value);
});
UI.registerHelper('isNullWithValue', function(value,placeholder){
	if(value == 0 || value == "0" || value == "null" || value == null || value == "" || value.length == 0){
		return placeholder;
	}
	return value;
});
UI.registerHelper('isNullWithValues', function(value,placeholder1, placeholder2){
    if(value == 0 || value == "0" || value == "null" || value == null || value == "" || value.length == 0){
        return placeholder2;
    }
    return placeholder1;
});
UI.registerHelper('getKeyAndValue', function(context, options) {
  var result = [];
  _.each(context, function(value, key, list){
    result.push({key:key, value:value});
  })
  return result;
});
UI.registerHelper('getLengthOfSessionArray', function(value) {
  return Session.get(value).length;
});
UI.registerHelper('getPartOfSessionArray', function(value,part){
    return Session.get(value)[part];
});
UI.registerHelper('toHtml', function(value){
    return new Handlebars.SafeString(value);
});
UI.registerHelper('dateToMDY', function(value){
    if(!isNull(value)){
        var date = new Date(value);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    }
    return "No Date"
});
UI.registerHelper('setBackPath',function(templateName){
    Session.set("backPath",templateName);
});
UI.registerHelper('pathForBack', function(){
    if(Session.get("backPath")){
        return Router.path(Session.get("backPath"));
    }
    return null;
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