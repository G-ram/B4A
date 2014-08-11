isNull = function(value){
    if(value == 0 || value == "0" || value == "null" || value == null || value == ""){
        return true;
    }
    return false;
};
generateGUId = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};
isValidPhoneNumber = function(phoneNumber){

};
isValidEmail = function(email){

};
cleanPhoneNumber = function(phoneNumber){
	return phoneNumber.replace(/\D/g,'');
};