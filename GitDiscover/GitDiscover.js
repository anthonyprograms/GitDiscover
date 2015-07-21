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
    "submit .filters": function (event) {
      event.preventDefault();

      // var skillLevel = $('filled-in:checked').val();

      // console.log(skillLevel);

      // return Entries.find({}, {sort: {createdAt}})
    },

    "submit .new-entry": function (event) {
      event.preventDefault();

      var name = $('input#name').val();
      var url = $('input#url').val();
      var description = $('textarea#description').val();
      // var language = $('input.filled-in:checked').val();
      var skillLevel = $('select#skill-level').val();

      var languages = [];
        $(':checkbox:checked').each(function(i){
          languages[i] = $(this).val();
        });
      console.log(languages);

      if ((name === "") || (url === "") || (description === "")){
        alert("You need to fill out each field before publishing your post.");
      }
      else{
        Entries.insert({
          createdAt: new Date(),
          name: name,
          url: url,
          description: description,
          language: languages,
          skillLevel: skillLevel,
          owner: Meteor.userId(),
          username: Meteor.user().username
        });

        $('input#name').val("");
        $('input#url').val("");
        $('textarea#description').val("");
      }
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
