import { Template } from 'meteor/templating';

import './teammanagement.html';


//console.log("test");
$('#teamside').show();
//console.log(Router.current().route.getName());


Template.teammanagement.helpers({
//  console.log("test"),
//should be rechecked for redundancy
  teamsideB() {
  var routeName = Router.current().route.getName();
    //console.log(routeName);
    if(routeName == "teammanagement"){
      return true;
    }
    else{
      return false;
    }
	},


});
