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
    {name : 'nadine mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    {name : 'nadine mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    {name : 'nadine mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    {name : 'nadine mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    ];
  },
});