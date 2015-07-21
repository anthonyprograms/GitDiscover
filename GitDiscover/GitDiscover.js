Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY'
  });

  Template.body.helpers({
    entries: function () {
      var level = Session.get("FilterSearch");
      // console.log(levels.length);
      if (level.length > 0){
          return Entries.find({skillLevel: level});
      }
      else{
        return Entries.find({}, {sort: {createdAt: -1}});
      }
    }
  });

  Template.body.events({
    "submit .filters": function (event) {
      event.preventDefault();

      // var languages = [];
      //   $('input[name=filter-level]:checked').each(function(i){
      //     languages[i] = $(this).val();
      //   });

      var level = "";
      $('input[name=filter-level]:checked').each(function(i){
        level = $(this).val();
      });

      Session.set("FilterSearch", level);
    },

    "submit .new-entry": function (event) {
      event.preventDefault();

      var name = $('input#name').val();
      var url = $('input#url').val();
      var description = $('textarea#description').val();
      var skillLevel = $('select#skill-level').val();
      var languages = [];
        $('input[name=form-language]:checked').each(function(i){
          languages[i] = $(this).val();
        });

      if ((name === "") || (url === "") || (description === "") || (skillLevel == "") || (languages.length === 0)){
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
    },
    "click .update": function () {
      // $('input#name').value = this.name;
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
