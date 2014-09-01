Meteor.users.index = Meteor.lunr(function() {
    this.field('firstName');
    this.field('lastName');
    this.field('phoneNumber');
    this.field('business');
    this.field('email');
    this.ref('_id');
});
Meteor.users.find({},{fields : {firstName: 1, lastName: 1, phoneNumber:1, business:1,email:1}}).observe({
  added: function(document){
    Meteor.users.index.add(document);
  },
  changed: function(newDocument, oldDocument){
    Meteor.users.index.update(newDocument);
  },
  removed: function(oldDocument){
    Meteor.users.index.remove(oldDocument);
  }
});
Meteor.methods({
    searchUsers: function(query){
      check(query, String);
      var searchResults = {};
      //Variables for user collection-wide search
      var userArray = Meteor.users.index.search(query);
      var idArray = [];
      var userResults = [];
      //Search current user
      var thisUser = Meteor.users.findOne({_id:this.userId},{'contactList':1,'bankList':1,'bankActivity':1});
      var contactResults = searchUserArray(thisUser,'contactList',query); 
      var bankResults = searchUserArray(thisUser,'bankList',query);
      var activityResults = searchUserArray(thisUser,'bankActivity',query);
      searchResults['contacts'] = contactResults;
      searchResults['banks'] = bankResults;
      searchResults['activity'] = activityResults;
      //Search all users
      if(userArray.length>0){
        for(var i = 0; i < userArray.length;i++){
          if(userArray[i].ref != this.userId){
            idArray[idArray.length] = userArray[i].ref;
          }
        }
        Meteor.users.find({_id: {$in: idArray}},
              {fields: {'firstName': 1, 'lastName': 1, 
              'business': 1,'profilePicUrl': 1}}).forEach(function(doc){
                //Check that contact is here
                userResults[userResults.length] = doc;
              });
        searchResults["users"] = userResults;
        return searchResults;
      }
      //Determines if something has been found
      if(contactResults.length>0 || activityResults.length>0 || 
        bankResults.length>0 || userResults.length>0){
        return searchResults
      }else{
        return null;
      }
    }
});
searchUserArray = function(user,array,query){
  var returnArray = [];
  if(user[array]){
    user[array].forEach(function(entry){
      if(searchString(JSON.stringify(entry),query)){
        returnArray[returnArray.length] = entry;
      }
    });
  }
  return returnArray;
};
searchString = function(string,query){
  var j = 0;
  string = string.toLowerCase();
  query = query.toLowerCase();
  if(string.indexOf(query) > -1){
    return true;
  }
  return false;
};