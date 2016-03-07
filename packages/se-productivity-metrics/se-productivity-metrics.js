// Write your package code here!


// Meteor.http.call("GET", "https://api.github.com/repos/tedxguc/backandforth/contributors",options, function(err, res) {
//     if (err) {
//         console.log("error @ get contributors", err)
//     } else {
//         console.log(res.data);
//         Grindage = res.data;
//     }
// });

// Grindage = "yello";
var options = {
    // timeout: 5000,
    headers: {'user-agent': 'meteor.js'}
};

Grindage = Meteor.http.call("GET", "https://api.github.com/repos/desoukya/SEMS/stats/contributors",options);
