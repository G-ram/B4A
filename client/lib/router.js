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
    path: '/transfer/confirm',
    template: 'transfer_confirm'
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
    path: '/edit/:state/debit'
  });
  this.route('edit_credit', {
    path: '/edit/:state/credit'
  });
  this.route('edit_account', {
    path: '/edit/:state/account'
  });
});