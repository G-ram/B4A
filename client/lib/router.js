//Setup
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

//Basic Routes
Router.map(function() {
  this.route('home', {
    path: '/'
  });
  this.route('login',{
    path: '/login'
  });
  this.route('transfer', {
    path: '/transfer'
  });
  this.route('transfer_confirm', {
    path: '/transfer/confirm'
  });
  this.route('contacts', {
    path: '/contacts'
  });
  this.route('contacts_add', {
    path: '/contacts/add'
  });
  this.route('contact_info_view', {
    path: '/contacts/:userId',
    waitOn: function() {
      return Meteor.subscribe('userContactAdvanced',this.params.userId);;
    },
    data: function () {
      return Meteor.users.findOne({_id:this.params.userId});
    }
  });
  this.route('edit', {
    path: '/edit',
    waitOn: function(){
      return Meteor.subscribe('userBankList');
    },
    data: function(){
      return Meteor.users.findOne({_id:this.userId});
    }
  });
  this.route('edit_add', {
    path: '/edit/add'
  });
  this.route('edit_debit', {
    path: '/edit/:state/debit',
    waitOn: function(){
      if(this.params.state == "revise"){
        return Meteor.subscribe('userBankAdvanced',this.params.bankId);
      }
      return null;
    },
    data: function(){
      if(this.params.state == "revise"){
        return Meteor.users.findOne({_id:this.userId});
      }
      return null;
    },
    onBeforeAction: function(){beforeHooks.isRevise(this.params.state)}
  });
  this.route('edit_credit', {
    path: "/edit/:state/debit",
    waitOn: function(){
      if(this.params.state == "revise"){
        return Meteor.subscribe('userBankAdvanced',this.params.bankId);
      }
      return null;
    },
    data: function(){
      if(this.params.state == "revise"){
        return Meteor.users.findOne({_id:this.userId});
      }
      return null;
    },
    onBeforeAction: function(){beforeHooks.isRevise(this.params.state)}
  });
  this.route('edit_account', {
    path: '/edit/:state/account',
    waitOn: function(){
      if(this.params.state == "revise"){
        return Meteor.subscribe('userBankAdvanced',this.params.bankId);
      }
      return null;
    },
    data: function(){
      if(this.params.state == "revise"){
        console.log("CALLED");
        console.log(Meteor.users.findOne({_id:this.userId}));
        return Meteor.users.findOne({_id:this.userId});
      }
      return null;
    },
    onBeforeAction: function(){beforeHooks.isRevise(this.params.state)}
  });
});

//On before routing actions
var beforeHooks = {
    isAdmin: function(pause) {
        if (!Roles.userIsInRole(Meteor.userId(), ['admin'])) {
          this.render('login');
          pause();
        }
    },
    isRevise: function(state){
      if(state == "revise"){
        Session.set("isRevise","Revise");
      }else{
        Session.set("isRevise","Add");
      }
    }
}
Router.onBeforeAction('loading');