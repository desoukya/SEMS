Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        // Creating a random password
        var pass = Random.id(20);

        // Creating the great admin
        console.log(Meteor.settings.adminEmail)
        var userId = Accounts.createUser({
            email: Meteor.settings.adminEmail,
            password: pass,
            profile: {
                firstName: 'System',
                lastName: 'Admin',
                GUCId: '00-00000',
                tutorialGroup: 'Adminstration',
            }
        });


        if (userId) {
            // Make em an admin !
            Roles.addUsersToRoles(userId, ADMIN);

            // He is a verified user for sure !
            Meteor.users.update(userId, {
                $set: {
                    'emails.0.verified': true
                }
            });

            Email.send({
                to: Meteor.settings.adminEmail,
                from: Meteor.settings.systemEmail,
                subject: "[SEMS] Welcome Adminstrator",
                text: `Hello Admin, your account is created with the following password: ${pass}\nPlease Change your password after logging in`
            });

        }

    }

    // console.log(Date.now())

    // metrics = new Metrics();
    // metrics.contributorsStatistics("https://github.com/desoukya/SEMS",function(err, res){
    //     if(err){
    //         // console.log("error hena ya 3am", err);
    //     }
    //     else{
    //         console.log(res.data);
    //     }
    // });
    // metrics.weeklyCodeFrequency("https://github.com/desoukya/SEMS",function(err, res){
    //     if(err){
    //         // console.log("error hena ya 3am", err);
    //     }
    //     else{
    //         console.log(res.data);
    //     }
    // });
    // metrics.repoIssues("https://github.com/desoukya/SEMS",function(err, res) {
    //     if (err) {
    //         // console.log("error hena ya 3am", err);
    //     } else {
    //         console.log(res);
    //     }
    // }, { state: "closed" });
    //  metrics.singleIssue("https://github.com/desoukya/SEMS",1,function(err, res) {
    //     if (err) {
    //         // console.log("error hena ya 3am", err);
    //     } else {
    //         console.log(res);
    //     }
    // });
    // metrics.punchCard("https://github.com/desoukya/SEMS",function(err, res){
    //     if(err){
    //         // console.log("error hena ya 3am", err);
    //     }
    //     else{
    //         console.log(res.data);
    //     }
    // });
    // console.log(Teams.find().fetch());



});
