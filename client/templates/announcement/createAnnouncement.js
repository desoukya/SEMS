Template.createAnnouncement.helpers({
  teamCompanies() {

    var takenCompanies = [];

    Teams.find().fetch().forEach(function(team) {
      takenCompanies.push(team.company);
    });
    var arr = Companies.find({ _id: { $in: takenCompanies } });
    console.log(arr.fetch());
    return arr;
  },

});
Template.createAnnouncement.onRendered(function() {
  $('.ui.dropdown').dropdown();
});
