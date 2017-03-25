Migrations.add({
  version: 5,
  name: 'mark questions closed/opened',
  up :function()
  {
 questions = Questions.find({});
    questions.forEach(function(question){
    //  console.log(user);
    var answers = question.answers;
    var bestFound = false;
    for(var i = 0; i<answers.length; i++){
      var answer = Answers.find({_id: answers[i]})
      if(answer.bestAnswer==true){
        bestFound=true;
        break;
      }
    }
    if(bestFound==false){
      Questions.update({_id: question._id},{$set: {closed: false}}, false, true)}
      else {
        Questions.update({_id: question._id},{$set: {closed: true}}, false, true)

      }
    });

    users = Meteor.users.find({});
       users.forEach(function(user){
         Meteor.users.update({_id: user._id},{$unset: {answers: 1, bestAnswers: 1 }}, false, true)
       });
  },
  down : function(){
  }
});
