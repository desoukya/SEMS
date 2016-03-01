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
var logosArray =
  [{
    "imageName": "jal2.gif",
    "companyName": "jal"
  }, {
    "imageName": "aeromexico.gif",
    "companyName": "AeroMexico"
  }, {
    "imageName": "egyptair.gif",
    "companyName": "Egypt Air"
  }, {
    "imageName": "klm2.gif",
    "companyName": "KLM Airlines"
  }, {
    "imageName": "airberlin.gif",
    "companyName": "Air Berlin"
  }, {
    "imageName": "korean.gif",
    "companyName": "Korean Air"
  }, {
    "imageName": "aircanada.gif",
    "companyName": "Air Canada"
  }, {
    "imageName": "lan2.gif",
    "companyName": "LAN Airlines"
  }, {
    "imageName": "airfrance2.gif",
    "companyName": "Air France"
  }, {
    "imageName": "lot2.gif",
    "companyName": "LOT Polish Airlines"
  }, {
    "imageName": "airindia2.gif",
    "companyName": "Air India"
  }, {
    "imageName": "lufthansa4.gif",
    "companyName": "Lufthansa"
  }, {
    "imageName": "airmadagascar.gif",
    "companyName": "Air Madagascar"
  }, {
    "imageName": "malaysia.gif",
    "companyName": "Malaysia Airlines"
  }, {
    "imageName": "air_new_zealand_logo2.gif",
    "companyName": "Air New Zealand"
  }, {
    "imageName": "midweat.gif",
    "companyName": "Midwest Airlines"
  }, {
    "imageName": "airphillipines.gif",
    "companyName": "Philippine Airlines"
  }, {
    "imageName": "nwa1.gif",
    "companyName": "Northwest Airlines"
  }, {
    "imageName": "airtran.gif",
    "companyName": "AirTran Airways"
  }, {
    "imageName": "oceanic.gif",
    "companyName": "Oceanic Airlines"
  }, {
    "imageName": "alaskaairlines3.gif",
    "companyName": "Alaska Airlines"
  }, {
    "imageName": "qantas2.gif",
    "companyName": "Qantas Airways"
  }, {
    "imageName": "alitalia.gif",
    "companyName": "Alitalia Airlines"
  }, {
    "imageName": "sabena2.gif",
    "companyName": "Sabena Airlines"
  }, {
    "imageName": "austrian2.gif",
    "companyName": "Austrian Airlines"
  }, {
    "imageName": "singapore_airlines2.gif",
    "companyName": "Singapore Airlines"
  }, {
    "imageName": "avianca1.gif",
    "companyName": "Avianca Airlines"
  }, {
    "imageName": "southafricanairways2.gif",
    "companyName": "South African Airways"
  }, {
    "imageName": "ba2.gif",
    "companyName": "British Airways"
  }, {
    "imageName": "southwest2.gif",
    "companyName": "Southwest Airlines"
  }, {
    "imageName": "brusselsairlines2.gif",
    "companyName": "Brussels Airlines"
  }, {
    "imageName": "spirit.gif",
    "companyName": "Spirit Airlines"
  }, {
    "imageName": "cathaypacific21.gif",
    "companyName": "Cathay Pacific Airlines"
  }, {
    "imageName": "srilankan.gif",
    "companyName": "SriLankan Airlines"
  }, {
    "imageName": "china_airlines.gif",
    "companyName": "China Airlines"
  }, {
    "imageName": "swissair3.gif",
    "companyName": "Swissair"
  }, {
    "imageName": "continental-airlines-logo2.gif",
    "companyName": "Continental Airlines"
  }, {
    "imageName": "swiss.gif",
    "companyName": "Swiss Airlines"
  }, {
    "imageName": "croatia2.gif",
    "companyName": "Croatia Airlines"
  }, {
    "imageName": "tap.gif",
    "companyName": "TAP Portugal"
  }, {
    "imageName": "dagonair.gif",
    "companyName": "Dragonair"
  }, {
    "imageName": "tarom.gif",
    "companyName": "TAROM Airlines"
  }, {
    "imageName": "delta3.gif",
    "companyName": "Delta Airlines"
  }, {
    "imageName": "thai4.gif",
    "companyName": "Thai Airways"
  }, {
    "imageName": "turkish.gif",
    "companyName": "Turkish Airlines"
  }, {
    "imageName": "emirates_logo2.gif",
    "companyName": "Emirates Airlines"
  }, {
    "imageName": "united.gif",
    "companyName": "United Airlines"
  }, {
    "imageName": "ethiopianairlines4.gif",
    "companyName": "Ethiopian Airlines"
  }, {
    "imageName": "varig.gif",
    "companyName": "Varig Airlines"
  }, {
    "imageName": "garudaindonesia.gif",
    "companyName": "Garuda Indonesia"
  }, {
    "imageName": "vietnamairlines.gif",
    "companyName": "Vietnam Airlines"
  }, {
    "imageName": "hawaiian2.gif",
    "companyName": "Hawaiian Airlines"
  }, {
    "imageName": "virgin4.gif",
    "companyName": "Virgin Australia Airlines"
  }, {
    "imageName": "iberia2.gif",
    "companyName": "Iberia"
  }, {
    "imageName": "wideroe1.gif",
    "companyName": "Widerøe"
  }, {
    "imageName": "icelandair_logo2.gif",
    "companyName": "Icelandair"
  }, ]



TeamUtils = {

  // Checking if user is in the given team
  isMember(userId, teamId) {
    if (Teams.findOne({
      _id: teamId,
      members: userId
    })) {
      return true;
    } else {
      return false;
    }
  },

  // Check if use is in any team
  isInTeam(userId) {
    if (Teams.findOne({
      members: userId
    })) {
      return true;
    } else {
      return false;
    }
  },

  getTeam(userId) {
    return Teams.findOne({
      members: userId
    }) || undefined;
  },

  getDefaultPhoto(teamId) {
    var hexValue = toHex(teamId.substring(0, 4));
    return "/images/airlines/" + logosArray[parseInt(hexValue) % 20].imageName;
  },
}