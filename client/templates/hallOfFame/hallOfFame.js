Template.hallOfFame.onRendered(function() {
  $('.ui.accordion').accordion();
});

Template.hallOfFame.helpers({
  winningTeamMembers() {
    return [
    {name : 'nadine mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    {name : 'mariam fawzy', image:'/images/hall-of-fame/28-/teamWinner/mariam.jpg'},
    {name : 'mohammed badr', image:'/images/hall-of-fame/28-/teamWinner/badr.jpg'},
    {name : 'mohammed meloul', image:'/images/hall-of-fame/28-/teamWinner/melouk.jpg'},
    {name : 'marwa regal', image:'/images/hall-of-fame/28-/teamWinner/marwa.jpg'},
    {name : 'mohammed raouf', image:'/images/hall-of-fame/28-/teamWinner/rauof.jpg'},
    {name : 'soha abu hamam', image:'/images/hall-of-fame/28-/teamWinner/soha.jpg'},
    {name : 'ali soliman', image:'/images/hall-of-fame/28-/teamWinner/soliman.jpg'},
    {name : 'anas ashraf', image:'/images/hall-of-fame/28-/teamWinner/anas.jpg'},
    ];
  },
});