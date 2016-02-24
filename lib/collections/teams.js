Teams = new Mongo.Collection("teams");

Teams.allow({
  insert: function() {
    //TODO : restrict normal users from creating teams
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

var Schemas = {};

Schemas.Team = new SimpleSchema({
  name: {
    type: String,
    label: "name",
    max: 20
  },
  logo: {
    type: String,
    label: "team logo",
    max: 200
  },
  repo: {
    type: String,
    label: "Github Repo",
    //TODO : add regex check to make sure it's a github link
  }
  members: {
    type: [String],
    minCount: 1
  },
  createdAt: {
    type: String,
    label: "creation date",
  }
});
Teams.attachSchema(Schemas.Material);