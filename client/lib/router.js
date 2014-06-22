//Setup
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});

//Basic Routes
Router.onBeforeAction('loading');

Router.map(function() {
  this.route('home', {
    path: '/'
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
  this.route('edit', {
    path: '/edit'
  });
  this.route('edit_add', {
    path: '/edit/add'
  });
  this.route('edit_debit', {
    path: '/edit/:state/debit',
    data:function(){
      var state = "Add";
      if(this.params.state == "revise"){state = "Revise"}
      templateData = {
        state: state
      };
      return templateData;
    }
  });
  this.route('edit_credit', {
    path: "/edit/:state/debit",
    data:function(){
      var state = "Add";
      if(this.params.state == "revise"){state = "Revise"}
      templateData = {
        state: state
      };
      return templateData;
    }
  });
  this.route('edit_account', {
    path: '/edit/:state/account',
    data:function(){
      var state = "Add";
      if(this.params.state == "revise"){state = "Revise"}
      templateData = {
        state: state
      };
      return templateData;
    }
  });
});