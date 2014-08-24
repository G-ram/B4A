Meteor.methods({
	//User modifcation methods
	updateFields: function(options){
		check(options,Match.Any);
		var fields = {};
		for(var index in editableFields){
			if(options[index]){
				if(index == "phoneNumber"){
					options[index] = Meteor.call("normalizePhoneNumber",options[index]);
				}
				check(options[index],editableFields[index]);
				fields[index] = options[index];
			}
		}
		Meteor.users.update(this.userId,{$set: fields},
			function(error){
			if(error){throw error;}
		});	
	},
	upsertAccountWithObject: function(account){
		check(account,Match.Any);
		var fields = {};
		if(!account.cardNumber){account.cardNumber = false;}
		if(!account.accountNumber){account.accountNumber = false;}
		if(account.type){
			if(Meteor.users.findOne({_id:this.userId,"bankList": {
    				$elemMatch: {"cardNumber": account.cardNumber}
    			}})){
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields["bankList.$."+index] = account[index];
					}
				}
				Meteor.users.update({_id: this.userId,
					"bankList": {
    					$elemMatch: {"cardNumber": account.cardNumber}}
    				},{$set: fields},
				function(error){
					if(error){throw error;}
				});
			}else if(Meteor.users.findOne({_id:this.userId,"bankList": {
    				$elemMatch: {"accountNumber": account.accountNumber}
    			}})){
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields["bankList.$."+index] = account[index];
					}
				}
				Meteor.users.update({_id: this.userId,
					"bankList": {
    					$elemMatch: {"accountNumber": account.accountNumber}}
   					},{$set: fields},
				function(error){
					if(error){throw error;}
				});
			}else if(account.bankId){
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields["bankList.$."+index] = account[index];
					}
				}
				Meteor.users.update({_id: this.userId,
					"bankList": {
    					$elemMatch: {"bankId": account.bankId}}
   					},{$set: fields},
				function(error){
					if(error){throw error;}
				});
			}else{
				fields["bankId"] = generateGUId();
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields[index] = account[index];
					}
				}
				Meteor.users.update(this.userId,{$addToSet: {"bankList": fields}},
				function(error){
					if(error){throw error;}
				});
			}
		}else{
			throw new Meteor.Error(300, 'Type not specified');
		}
	},
	deleteAccountWithId: function(bankId){
		check(bankId,String);
		Meteor.users.update(this.userId,{$pull: {"bankList":{"bankId":bankId}}},
		function(error){
			if(error){throw error;}
		});
	},
	upsertContactListByUserId: function(userId){
		check(userId,String);
		if(Meteor.users.findOne({_id:userId})){
			var user = Meteor.users.findOne({_id:userId},{fields: {'firstName': 1, 'lastName': 1, 'profilePic':1}});
			var name = user.firstName + " " + user.lastName;
			var fields = {"_id":userId,"name":name,"profilePic":user.profilePic};
			Meteor.users.update(this.userId,{$addToSet: {"contactList": fields}},
			function(error){
				if(error){throw error;}
			});
		}else{
			throw new Meteor.error(301, 'User not found');
		}
	},
	deleteContactWithByUserId: function(userId){
		check(userId,String);
		Meteor.users.update(this.userId,{$pull: {"contactList":{"id":userId}}},
		function(error){
			if(error){throw error;}
		});
	},
	registerTransaction: function(transaction){
		check(transaction,Match.Any);
		transaction["transactionId"] = generateGUId();
		transaction["dateMade"] = new Date();
		Meteor.users.update(this.userId,{$addToSet: {"bankActivity": transaction}},
		function(error){
			if(error){throw error;}
		});
	},
	convertPhoneNumberToUserId: function(phoneNumber){
		return Meteor.users.findOne({phoneNumber: phoneNumber},
                             {fields: {'_id': 1}});
	},
	convertEmailToUserId: function(email){
		return Meteor.users.findOne({email: email},
							{fields: {'_id':1}});
	},
	normalizePhoneNumber: function(phoneNumber){
		check(phoneNumber,String);
		return Phone(phoneNumber,'').substring(1);
	},
	consoleUser: function(){
		console.log(Meteor.user());
	}
});