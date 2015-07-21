Entries = new Mongo.Collection("entries");

if (Meteor.isClient) {
  Accounts.ui.config({
   passwordSignupFields: 'USERNAME_ONLY'
  });

  Template.body.helpers({
    entries: function () {
      var language = "";
      var level = "";

      if (Session.get("FilterSearch-Language") !== undefined){
        language = Session.get("FilterSearch-Language");
      }

      if (Session.get("FilterSearch-Level") !== undefined){
        level = Session.get("FilterSearch-Level");
      }

      if ((level.length > 0) && (language.length > 0)){
        console.log("1");
        return Entries.find({skillLevel: level, language: language}, {sort: {createdAt: -1}});
      }
      else if (language.length > 0){
        console.log("2");
        return Entries.find({language: language}, {sort: {createdAt: -1}});
      }
      else if (level.length > 0){
        console.log("3");
        return Entries.find({skillLevel: level}, {sort: {createdAt: -1}});
      }
      else{
        console.log("4");
        return Entries.find({}, {sort: {createdAt: -1}});
      }
    }
  });

  Template.body.events({
    "submit .filters": function (event) {
      event.preventDefault();

      var language = "";
      $('input[name=filter-language]:checked').each(function(i){
        language = $(this).val();
      });

      var level = "";
      $('input[name=filter-level]:checked').each(function(i){
        level = $(this).val();
      });

      Session.set("FilterSearch-Language", language)
      Session.set("FilterSearch-Level", level);
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
      else if(url.substring(0,4).toLowerCase() !== "http"){
        alert("URL must start with http");
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

        $('.filters').toggle('show');
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
