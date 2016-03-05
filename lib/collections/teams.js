Teams = new Mongo.Collection('teams');

Teams.allow({
  insert() {
    // Only Scrums can create new teams
    if (Roles.userIsInRole(Meteor.userId(), SCRUM)) {

      // User can't create multiple teams
      var alreadyCreated = Teams.findOne({
        members: Meteor.userId()
      });

      if (alreadyCreated) {
        return false;
      }

      return true;
    }

    return false;
  },
  update() {
    // Scrums and higher roles can update teams
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, SCRUM])) {
      return true;
    }

    return false;

  },
  remove() {
    // Scrums can't remove teams, only TAs and higher
    if (Roles.userIsInRole(Meteor.userId(), [ADMIN, LECTURER, TA])) {
      return true;
    }

    return false;
  }
});

Teams.deny({
  insert() {
    // Not logged in ? get out !
    if (!UserUtils.isLoggedIn()) {
      return true;
    }
    return false;
  },
  update() {
    if (!UserUtils.isLoggedIn()) {
      return true;
    }
    return false;
  },
  remove() {
    if (!UserUtils.isLoggedIn()) {
      return true;
    }
    return false;
  }
});


var Schemas = {};

Schemas.Team = new SimpleSchema({
  name: {
    type: String,
    label: 'name',
    max: 33,
    min: 3
  },

  company: {
    type: String,
    label: 'company'
  },

  logo: {
    type: String,
    label: 'team logo',
    max: 200,
    optional: true
  },

  repo: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    label: 'Github Repo',
    //TODO : add regex check to make sure it's a github link
  },

  members: {
    type: [String],
    minCount: 1,
    maxCount: 8,
    //TODO : add a custom validator to make sure the members are not in another team
  },

  createdAt: {
    type: String,
    label: 'creation date',
  },

});

Teams.attachSchema(Schemas.Team);
