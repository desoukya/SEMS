Migrations.add({
  version: 1,
  name: 'change createdAt field to count milli seconds',
  up: function() {

    var collections = [Announcements, Questions, Answers, Teams, Materials];
    collections.forEach(function(collection) {
      console.log('Migrating collection ' + collection._name);

      collection.find().fetch().forEach(function(document) {
        var oldDate = document.createdAt;
        var newDate = Date.parse(oldDate);
        if(!!parseInt(newDate)){
          console.log(oldDate + " -> " + newDate);
          collection.update({_id:document._id},{$set:{createdAt:newDate}},{validate: false});
        } else
          console.log(oldDate, "couldn't parse old Date");
      });

      console.log('-----------------------------------------------');
    });
  },
  down: function() {
    var collections = [Announcements, Questions, Answers, Teams, Materials];
    collections.forEach(function(collection) {
      console.log('Migrating collection ' + collection._name);

      collection.find().fetch().forEach(function(document) {
        var oldDate = document.createdAt;
        var newDate = moment(parseInt(oldDate)).toString();

        if(!!parseInt(oldDate)){
          console.log(oldDate + " -> " + newDate);
          collection.update({_id:document._id},{$set:{createdAt:newDate}},{validate: false});
        } else
          console.log(oldDate, " is not in the expected format");
        collection.update({_id:document._id},{$set:{createdAt:newDate}},{validate: false});
        console.log(oldDate + " -> " + newDate);
      });

      console.log('-----------------------------------------------');
    });
  }
});