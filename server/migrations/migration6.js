Migrations.add({
  version: 6,
  name: 'mark questions closed/opened',
  up :function()
  {
 questions = Questions.find({});
    questions.forEach(function(question){
    //  console.log(user);
      Questions.update({_id: question._id},{$set: {closed: false}}, false, true)
    });
  },
  down : function(){
  }
});
