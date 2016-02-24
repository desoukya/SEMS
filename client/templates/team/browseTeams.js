var imagesArray = ["apple.png",
  "cherry.png",
  "grapes.png",
  "onion.png",
  "pumpkin.png",
  "apricot.png",
  "coconut.png",
  "green-onion.png",
  "orange.png",
  "tomato.png",
  "banana.png",
  "corn.png",
  "kiwi.png",
  "pear.png",
  "turnip.png",
  "carrot.png",
  "egg-plant.png",
  "lemon.png",
  "pinapple.png",
  "water-melon.png"
];


Template.browseTeam.helpers({
  teams: function() {
    return Teams.find();
  },

});
Template.teamCard.helpers({
  image: function() {
    var hexValue = toHex(this._id.substring(0, 4));
    return imagesArray[parseInt(hexValue) % 20]; // we have 5 default photo
  },
  membersCount: function() {
    return this.members.length;
  },
});