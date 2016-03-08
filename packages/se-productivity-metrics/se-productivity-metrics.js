Metrics = function(timeout) {

    colors.enabled = true; // To color Terminal outputs


    /**
    Initializing options
    **/
    if (typeof timeout === "number") {
        this.options = {
            timeout: timeout,
            headers: { 'user-agent': 'meteor.js' }
        }
    } else {
        this.options = {
            // timeout: 5000,
            headers: { 'user-agent': 'meteor.js' }
        }
    }

    /**
    total - The Total number of commits authored by the contributor.

    Weekly Hash (weeks array):
    w - Start of the week, given as a Unix timestamp.
    a - Number of additions
    d - Number of deletions
    c - Number of commits
     **/
    this.contributorsStatistics = function(callback) {
        Meteor.http.call("GET", "https://api.github.com/repos/desoukya/SEMS/stats/contributors", this.options,
            function(err, res) {
                if (err) {
                    console.log("error getting contributor statistics".red, err);
                    callback(err, res);
                } else {
                    console.log("Retrieved contributor stats successfully".green, res.statusCode);
                    callback(err, res);
                }
            });
    }

    /**
	Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
	**/
    this.weeklyCodeFrequency = function(callback) {
        Meteor.http.call("GET", "https://api.github.com/repos/desoukya/SEMS/stats/code_frequency", this.options,
            function(err, res) {
                if (err) {
                    console.log("error getting weekly code frequency".red, err);
                    callback(err, res);
                } else {
                    console.log("Retrieved weekly code frequency successfully".green, res.statusCode);
                    callback(err, res);
                }
            });
    }

    /** 
    Each array contains the day number, hour number, and number of commits:

	0-6: Sunday - Saturday
	0-23: Hour of day
	Number of commits

	For example, [2, 14, 25] indicates that there were 25 total commits, 
		during the 2:00pm hour on Tuesdays. All times are based on the time zone of individual commits.
	**/
    this.punchCard = function(callback) {
        Meteor.http.call("GET", "https://api.github.com/repos/desoukya/SEMS/stats/punch_card", this.options,
            function(err, res) {
                if (err) {
                    console.log("error getting punch card number of daily commits".red, err);
                    callback(err, res);
                } else {
                    console.log("Retrieved punch card successfully".green, res.statusCode);
                    callback(err, res);
                }
            });
    }
}
