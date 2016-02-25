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


TeamUtils = {
  isInTeam(teamId) {
    if (Teams.findOne({
        _id: teamId,
        members: Meteor.userId()
      })) {
      return true;
    } else {
      return false;
    }
  },

  getDefaultPhoto(teamId) {
    var hexValue = toHex(teamId.substring(0, 4));
    return "/images/teams/" + imagesArray[parseInt(hexValue) % 20]
  },
}
