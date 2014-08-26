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
Meteor.publish("searchUsers", function(query){
    check(query, String);
    var userArray = Meteor.users.index.search(query);
    var idArray = [];
    if(userArray.length>0){
      for(var i = 0; i < userArray.length;i++){
        idArray[idArray.length] = userArray[i].ref;
      }
      console.log(idArray);
      return Meteor.users.find({_id: {$in: idArray}},
                               {fields: {'firstName': 1, 'lastName': 1, 'business': 1,'profilePicUrl': 1}});
    }else{
      this.ready(); 
    }
});