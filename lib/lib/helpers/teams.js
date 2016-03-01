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
[{"imageName": "aeroflot_logo.gif" , "companyName": "aeroflot_logo"},               
{"imageName": "jal2.gif" , "companyName": "jal2"},
{"imageName": "aeromexico.gif" , "companyName": "aeromexico"},                  
{"imageName": "klm2.gif" , "companyName": "klm2"},
{"imageName": "airberlin.gif" , "companyName": "airberlin"},                   
{"imageName": "korean.gif" , "companyName": "korean"},
{"imageName": "aircanada.gif" , "companyName": "aircanada"},                   
{"imageName": "lan2.gif" , "companyName": "lan2"},
{"imageName": "airfrance2.gif" , "companyName": "airfrance2"},                  
{"imageName": "lot2.gif" , "companyName": "lot2"},
{"imageName": "airindia2.gif" , "companyName": "airindia2"},                   
{"imageName": "lufthansa4.gif" , "companyName": "lufthansa4"},
{"imageName": "airmadagascar.gif" , "companyName": "airmadagascar"},               
{"imageName": "malaysia.gif" , "companyName": "malaysia"},
{"imageName": "air_new_zealand_logo2.gif" , "companyName": "air_new_zealand_logo2"},       
{"imageName": "midweat.gif" , "companyName": "midweat"},
{"imageName": "airphillipines.gif" , "companyName": "airphillipines"},              
{"imageName": "nwa1.gif" , "companyName": "nwa1"},
{"imageName": "airtran.gif" , "companyName": "airtran"},                     
{"imageName": "oceanic.gif" , "companyName": "oceanic"},
{"imageName": "alaskaairlines3.gif" , "companyName": "alaskaairlines3"},             
{"imageName": "qantas2.gif" , "companyName": "qantas2"},
{"imageName": "alitalia.gif" , "companyName": "alitalia"},                    
{"imageName": "sabena2.gif" , "companyName": "sabena2"},
{"imageName": "austrian2.gif" , "companyName": "austrian2"},                   
{"imageName": "singapore_airlines2.gif" , "companyName": "singapore_airlines2"},
{"imageName": "avianca1.gif" , "companyName": "avianca1"},                    
{"imageName": "southafricanairways2.gif" , "companyName": "southafricanairways2"},
{"imageName": "ba2.gif" , "companyName": "ba2"},                         
{"imageName": "southwest2.gif" , "companyName": "southwest2"},
{"imageName": "brusselsairlines2.gif" , "companyName": "brusselsairlines2"},           
{"imageName": "spirit.gif" , "companyName": "spirit"},
{"imageName": "cathaypacific21.gif" , "companyName": "cathaypacific21"},             
{"imageName": "srilankan.gif" , "companyName": "srilankan"},
{"imageName": "china_airlines.gif" , "companyName": "china_airlines"},              
{"imageName": "swissair3.gif" , "companyName": "swissair3"},
{"imageName": "continental-airlines-logo2.gif" , "companyName":"airlines"},
{"imageName": "swiss.gif" , "companyName": "swiss"},
{"imageName": "croatia2.gif" , "companyName": "croatia2"},                    
{"imageName": "tap.gif" , "companyName": "tap"},
{"imageName": "dagonair.gif" , "companyName": "dagonair"},                    
{"imageName": "tarom.gif" , "companyName": "tarom"},
{"imageName": "delta3.gif" , "companyName": "delta3"},                      
{"imageName": "thai4.gif" , "companyName": "thai4"},
{"imageName": "elal2.gif" , "companyName": "elal2"},                       
{"imageName": "turkish.gif" , "companyName": "turkish"},
{"imageName": "emirates_logo2.gif" , "companyName": "emirates_logo2"},              
{"imageName": "united.gif" , "companyName": "united"},
{"imageName": "ethiopianairlines4.gif" , "companyName": "ethiopianairlines4"},          
{"imageName": "varig.gif" , "companyName": "varig"},
{"imageName": "garudaindonesia.gif" , "companyName": "garudaindonesia"},             
{"imageName": "vietnamairlines.gif" , "companyName": "vietnamairlines"},
{"imageName": "hawaiian2.gif" , "companyName": "hawaiian2"},                   
{"imageName": "virgin4.gif" , "companyName": "virgin4"},
{"imageName": "iberia2.gif" , "companyName": "iberia2"},                     
{"imageName": "wideroe1.gif" , "companyName": "wideroe1"},
{"imageName": "icelandair_logo2.gif" , "companyName": "icelandair_logo2"},]


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
