Template.createAnnouncement.helpers({
  teams() {
    return Teams.find();
  },

});
Template.createAnnouncement.onRendered(function() {
  $('.ui.dropdown').dropdown();
});

Template.createAnnouncement.events({
  'submit .form': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var description = event.target.description.value;
    var companies = event.target.companies.value.split(',').filter(function(company) {
      return company.length > 0;
    });
    var announcement = {
      title: title,
		  ownerId: Meteor.userId(),
		  description: description,
		  teams: companies,
		  createdAt: new Date()
		};
		console.log(announcement);
    Announcements.insert(announcement);

  },
})