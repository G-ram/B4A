//Setup
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

//Basic Routes
Router.map(function() {
  this.route('home', {
    path: '/',
    waitOn: function(){
      return [Meteor.subscribe('userBankList'),Meteor.subscribe('userBankActivity')];
    },
    data: function(){
      return Meteor.users.findOne({_id:this.userId});
    }
  });
  this.route('login',{
    path: '/login'
  });
  this.route('transfer', {
    path: '/transfer',
    waitOn: function(){
      return Meteor.subscribe('userBankList');
    },
    data: function(){
      return Meteor.users.findOne({_id:this.userId});
    }
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
    path: '/edit/add',
    onBeforeAction: function(){
      beforeHooks.isRevise(Session.get("bankId"));
    }
  });
  this.route('edit_debit', {
    path: '/edit/debit/',
    waitOn: function(){
      if(Session.get("bankId")){
        return Meteor.subscribe('userBankAdvanced',Session.get("bankId"));
      }
      return null;
    },
    data: function(){
      if(Session.get("bankId")){
        return Meteor.users.findOne();
      }
      return null;
    },
    onBeforeAction: function(){
      beforeHooks.isRevise(Session.get("bankId"));
    }
  });
  this.route('edit_credit', {
    path: "/edit/credit/",
    waitOn: function(){
      if(Session.get("bankId")){
        return Meteor.subscribe('userBankAdvanced',Session.get("bankId"));
      }
      return null;
    },
    data: function(){
      if(Session.get("bankId")){
        return Meteor.users.findOne();
      }
      return null;
    },
    onBeforeAction: function(){
      beforeHooks.isRevise(Session.get("bankId"));
    }
  });
  this.route('edit_account', {
    path: '/edit/account/',
    waitOn: function(){
      if(Session.get("bankId")){
        return Meteor.subscribe('userBankAdvanced',Session.get("bankId"));
      }
      return null;
    },
    data: function(){
      if(Session.get("bankId")){
        return Meteor.users.findOne();
      }
      return null;
    },
    onBeforeAction: function(){
      beforeHooks.isRevise(Session.get("bankId"));
    }
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
    isRevise: function(bankId){
      if(bankId){
        Session.set("isRevise","Revise");
      }else{
        Session.set("isRevise","Add");
      }
    }
}
Router.onBeforeAction('loading');