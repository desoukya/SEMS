Meteor.publish('users', function(roles = ROLES) {

  // Checking that roles is an array of strings
  check(roles, [String]);

  var userId = this.userId;
  var user = Meteor.users.findOne(userId);


  var filter = {
    fields: {
      profile: 1,
      roles: 1
    }
  };

  var selector = {};

  if (roles) {
    var filteredRoles = []
    _.each(roles, function(role) {
      if (_.contains(ROLES, role)) {
        filteredRoles.push(role);
      }
    });


    selector['roles'] = {
      $in: filteredRoles
    }

  }

  if (user) {
    // Admins can have full access to users
    if (Roles.userIsInRole(user, ADMIN)) {
      filter = {};
    }

    return Meteor.users.find(selector, filter);
  }
  // If user is not logged in return nothing to fire up ready()
  return [];
});

Meteor.publish('images', function() {
  return Images.find({});
});

Meteor.publish('files', function() {
  return Files.find({});
});

Meteor.publish('materials', function() {
  return Materials.find({});
});

Meteor.publish('teams', function() {
  return Teams.find({});
});

Meteor.publish('leaderboardSortedTeams', function() {
  ReactiveAggregate(this, Teams, [
    { $unwind: "$metrics" }, {
      $group: {
        _id: "$_id",
        metrics: { $last: "$metrics" },
        company: { "$first": "$company" },
        members: { "$first": "$members" },
        name: { "$first": "$name" },
        slug: { "$first": "$slug" },
        friendlySlugs: { "$first": "$friendlySlugs" },
        repo: { "$first": "$repo" }
      }
    },
    { $sort: { "metrics.dailyPoints": -1 } }
  ]);
});

Meteor.publish('gitAuth', function() {
  return GitAuth.find({});
});

Meteor.publish('companies', function() {
  return Companies.find({});
});

Meteor.publish('announcements', function() {
  return Announcements.find({ milestone: { $ne: true } });
});

Meteor.publish('milestones', function() {
  return Announcements.find({ milestone: true });
});

Meteor.publish('allAnnouncements', function() {
  return Announcements.find();
});

Meteor.publish('questions', function() {
  return Questions.find({});
});

Meteor.publish("answers", function() {
  return Answers.find({});
});

Meteor.publish('notifications', function() {
  return Notifications.find({ ownerId: this.userId });

});

Meteor.publishComposite('questionData', function(questionId) {

  return {

    find() {
      return Questions.find({ _id: questionId });

    },

    children: [

      {
        find(question) {
          let commentIds = question.comments || [];
          return Comments.find({ _id: { $in: commentIds } });
        }
      },

      {

        find(question) {
          let answerIds = question.answers || [];
          return Answers.find({ _id: { $in: answerIds } });
        },

        children: [

          {
            find(answer) {
              let commentIds = answer.comments || [];
              return Comments.find({ _id: { $in: commentIds } });
            },

          }
        ],

      }

    ],

  }

});