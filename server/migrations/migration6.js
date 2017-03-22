Migrations.add({
  version: 6,
  name: 'mark questions closed/opened',
  up :function()
  {
 questions = Questions.find({});
    questions.forEach(function(question){
    //  console.log(user);
    var answers = question.answers;
    var bestFound = false;
    for(var i = 0; i<answers.length; i++){
      if(answers[i].bestAnswer==true){
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
  },
  down : function(){
  }
});
