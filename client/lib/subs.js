Deps.autorun(function () {
  Meteor.subscribe("userBasic");
  Meteor.subscribe("userAdvanced");
  Meteor.subscribe("userContactList");
  Meteor.subscribe("userBankBasic");
});