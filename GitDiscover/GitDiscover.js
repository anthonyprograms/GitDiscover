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
      var description = $('input.description').val();

      Entries.insert({
        createdAt: new Date(),
        name: name,
        url: url,
        description: description
      });

      $('input.name').val("");
      $('input.url').val("");
      $('input.description').val("");
    }
  });
}

if (Meteor.isServer) {

}
