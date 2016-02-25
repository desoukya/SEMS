// ES6
Template.teamAbout.helpers({
  teamName() {
    return this.name;
  },

  members() {
    return [{
      name: "Kalinka Bash",
      image: "/images/default_0.png",
      tutorialGroup: "CSEN 10"
    }, {
      name: "Sue Namibia",
      image: "/images/default_1.png",
      tutorialGroup: "CSEN 15"
    }, {
      name: "Crash Bandicoot",
      image: "/images/default_2.png",
      tutorialGroup: "CSEN 11"
    }, {
      name: "Loop Indian",
      image: "/images/default_3.png",
      tutorialGroup: "CSEN 12"
    }, {
      name: "Crash Loop",
      image: "/images/default_5.png",
      tutorialGroup: "CSEN 12"
    }, {
      name: "Infinite thing",
      image: "/images/default_4.png",
      tutorialGroup: "CSEN 15"
    }]
  },

  teamImage() {
    return TeamUtils.getDefaultPhoto(this._id);
  }

});
