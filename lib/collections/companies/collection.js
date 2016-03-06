Companies = new Mongo.Collection('companies');

Companies.helpers({
  team() {
    return Teams.findOne({ company: this._id });
  },

});
