Template.hallOfFame.onRendered(function() {
  $('.ui.accordion').accordion();
});

Template.hallOfFame.helpers({
  winningTeamMembers28() {
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
  winningTeamMembers25() {
    return [ "Mohamed Abdelhamed Metawaa","Rami Khalil","Ahmed Elassuty",
    "Abdullrahman Elhusseny","Rana Ahmed Elnagar","Mohamed Fadel",
    "Ebrahim Serag","Ahmed Osam","Abanoub Mimi","Ahmed Mohamed Magdi",
    "Khaled Helmy","Ahmed Moataz","Mussab ElDash","Lin Kassem",
    "Rania Abdel Fattah","Muhammad Mamdouh","Mohamed Saeed",
    "Ahmed Atef","Nadine Adel","Mohab Ghanim","Ahmed Akram",
    "Ahmed Sharaf","Amir George","Mohamed El-Mahdi"
    ];
  },
});
