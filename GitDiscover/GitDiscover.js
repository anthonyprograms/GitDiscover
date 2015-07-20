Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Template.body.helpers({
    entries: function () {
      return Entries.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-entry": function (event) {
      event.preventDefault();

      var name = $('input.name').val();
      var url = $('input.url').val();
      var description = $('textarea.description').val();
      var language = $('select.language').val();
      var skillLevel = $('select.skill-level').val();

      Entries.insert({
        createdAt: new Date(),
        name: name,
        url: url,
        description: description,
        language: language,
        skillLevel: skillLevel
      });

      $('input.name').val("");
      $('input.url').val("");
      $('textarea.description').val("");
    }
  });
}

if (Meteor.isServer) {

}
