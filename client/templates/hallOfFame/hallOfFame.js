Template.hallOfFame.onRendered(function() {
  $('.ui.accordion').accordion();
});

Template.hallOfFame.helpers({
  winningTeamMembers31A() {
    return [ "Mostafa Abdullah", "Omar Radwan", "Ahmed Elsagheer", "Ahmed Soliman", "Ahmed Ashraf Awwad", "Mohamed Khaled", "Ahmed Kamel"];
  },
  winningTeamMembers31B() {
    return [ "Hazem Ayman", "Mohamed Ashraf", "Mostafa Ibrahim", "Narihan Ellaithy", "Yara Sobhy", "Safa Ads","Youssef Radi"];
  },
  winningTeamMembers31C() {
    return [ "Gamal Mostafa", "Badry Atef", "Mina Samir", "Walid ElHefny","Patrick Mounir", "Ahmed Hesham Ghazy","Ahmed Ouda"];
  },

  winningTeamMembers28() {
    return [
    {name : 'Nadine Mansour', image:'/images/hall-of-fame/28-/teamWinner/nadin.jpg'},
    {name : 'Mariam Fawzy', image:'/images/hall-of-fame/28-/teamWinner/mariam.jpg'},
    {name : 'Mohammed Badr', image:'/images/hall-of-fame/28-/teamWinner/badr.jpg'},
    {name : 'Mohammed Melouk', image:'/images/hall-of-fame/28-/teamWinner/melouk.jpg'},
    {name : 'Marwa Regal', image:'/images/hall-of-fame/28-/teamWinner/marwa.jpg'},
    {name : 'Mohammed Raouf', image:'/images/hall-of-fame/28-/teamWinner/rauof.jpg'},
    {name : 'Soha Abu Hamam', image:'/images/hall-of-fame/28-/teamWinner/soha.jpg'},
    {name : 'Ali Soliman', image:'/images/hall-of-fame/28-/teamWinner/soliman.jpg'},
    {name : 'Anas Ashraf', image:'/images/hall-of-fame/28-/teamWinner/anas.jpg'},
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
