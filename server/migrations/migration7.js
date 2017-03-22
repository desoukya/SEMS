Migrations.add({
  version: 7,
  name: 'count answers and best answers',
  up :function()
  {

 users = Meteor.users.find({});
    users.forEach(function(user){
    //  console.log(user);
      Meteor.users.update({_id: user._id},{$set: {bestAnswers: 0}}, false, true)
        Meteor.users.update({_id: user._id},{$set: {answers: 0}}, false, true)
    });
  questions = Questions.find({});
    //console.log(answers);
    questions.forEach(function(question){
      var answers = question.answers;
      for(var i =0 ; i<answers.length;i++){
        var answer = Answers.find({_id: answers[i]});
        var owner = answer.ownerId;
          Meteor.users.update({_id: owner},{$inc: {answers: 1}}, false, true)
          if(answer.bestAnswer == true)
            Meteor.users.update({_id: owner},{$inc: {bestAnswers: 1}}, false, true)
      }


    })
  },
  down : function(){
  }
});
