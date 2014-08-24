//Includes first name, last name, business, email, profile pic
Meteor.publish("userBasic", function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
                             {fields: {'firstName': 1, 'lastName': 1, 'business': 1,'email': 1,'profilePicUrl': 1}});
	}else{
		this.ready();
	}
});
//Includes phone number, ETC.
Meteor.publish("userAdvanced",function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
                             {fields: {'phoneNumber': 1}});
	}else{
		this.ready();
	}
});
//Includes contacts (Contact includes first name, last name, business, userId, profilePicURL) (Dictionary)
Meteor.publish("userContactList", function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
                             {fields: {'contactList': 1}});
	}else{
		this.ready();
	}
});
//Includes the contact's first name, last name, business, phone number, email
Meteor.publish("userContactAdvanced", function(userId){
	check(userId,String);
	if(this.userId){
		return Meteor.users.find({_id: userId},
                             {fields: {'firstName': 1, 'lastName': 1, 'business': 1,'email': 1,'phoneNumber': 1}});
	}else{
		this.ready();
	}
});
//Includes B4A balance, ETC.
Meteor.publish("userBankBasic", function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
							{fields:{'balance': 1}});
	}else{
		this.ready();
	}
});
//Includes bank name, type, routing number, card number
Meteor.publish("userBankList",function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
							{fields:{'bankList.bankId': 1,"bankList.type":1,"bankList.bankName":1,"bankList.routingNumber":1,"bankList.cardNumber":1}});
	}else{
		this.ready();
	}
});
//Includes B4A balance, ETC.
Meteor.publish("userBankAdvanced", function(bankId){
	check(bankId,String);
	if(this.userId){
		return Meteor.users.find({"bankList.bankId": bankId},{fields: {"bankList.$":1}});
	}else{
		this.ready();
	}
});
//Includes bank activity (Dictionary)
Meteor.publish("userBankActivity", function(){
	if(this.userId){
		return Meteor.users.find({_id: this.userId},
							{fields:{'bankActivity': 1}});
	}else{
		this.ready();
	}
});