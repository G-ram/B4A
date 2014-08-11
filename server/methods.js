Meteor.methods({
	//User modifcation methods
	updateFields: function(options){
		check(options,Match.Any);
		var fields = {};
		for(var index in editableFields){
			if(options[index]){
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
		if(account.type){
			if(Meteor.users.find({_id:this.userId,"bankList.cardNumber":account.cardNumber})){
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields[index] = account[index];
					}
				}
				Meteor.users.update({_id: this.userId,
					"bankList": {
    					$elemMatch: {"cardNumber": account.cardNumber}}
    				},{$set: {"bankList.$" : fields}},
				function(error){
					if(error){throw error;}
				});
			}else if(Meteor.users.find({_id:this.userId,"bankList.accountNumber":account.accountNumber})){
				for(var index in bankAccountFields){
					if(account[index]){
						check(account[index],bankAccountFields[index]);
						fields[index] = account[index];
					}
				}
				Meteor.users.update({_id: this.userId,
					"bankList": {
    					$elemMatch: {"accountNumber": account.accountNumber}}
   					},{$set: {"bankList.$" : fields}},
				function(error){
					if(error){throw error;}
				});
			}else{
				fields["id"] = generateGUId();
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
	deleteAccountWithObject: function(account){
		//DELETE RECORD
	},
	upsertContactListByUserId: function(userId){
		check(userId,String);
		if(Meteor.users.find({_id:userId}).limit(1)){
			var user = Meteor.users.findOne({_id:userId},{fields: {'firstName': 1, 'lastName': 1, 'profilePic':1}});
			var name = user.firstName + " " + user.lastName;
			var fields = {"userId":userId,"name":name,"profilePic":user.profilePic};
			Meteor.users.update(this.userId,{$addToSet: {"contactList": fields}},
			function(error){
				if(error){throw error;}
			});
		}else{
			throw new Meteor.error(301, 'User not found');
		}
	},
	deleteContactWithByUserId: function(userId){
		//DELETE RECORD
	},
	convertPhoneNumberToUserId: function(phoneNumber){
		return Meteor.users.findOne({phoneNumber: phoneNumber},
                             {fields: {'_id': 1}});
	},
	convertEmailToUserId: function(email){
		return Meteor.users.findOne({email: email},
							{fields: {'_id':1}});
	},
	consoleUser: function(){
		console.log(Meteor.user());
	}
});