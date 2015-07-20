Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY'
  });

  Template.body.helpers({
    entries: function () {
      return Entries.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-entry": function (event) {
      event.preventDefault();

      var name = $('input#name').val();
      var url = $('input#url').val();
      var description = $('textarea#description').val();
      var language = $('select#language').val();
      var skillLevel = $('select#skill-level').val();

      Entries.insert({
        createdAt: new Date(),
        name: name,
        url: url,
        description: description,
        language: language,
        skillLevel: skillLevel,
        owner: Meteor.userId(),
        username: Meteor.user().username
      });

      $('input.name').val("");
      $('input.url').val("");
      $('textarea#description').val("");
    }
  });

  Template.entry.events({
    "click .delete": function () {
      Entries.remove(this._id);
    }
  });

  Template.entry.helpers({
    isOwner: function () {
      return Meteor.userId() == this.owner;
    }
  });
}

if (Meteor.isServer) {

}
