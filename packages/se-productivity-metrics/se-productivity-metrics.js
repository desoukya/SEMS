Metrics = function(githubId, githubSecret, accessToken, timeout) {

  colors.enabled = true; // To color Terminal outputs

  /**
  Initializing options
  **/
  if (typeof timeout === "number") {
    this.options = {
      timeout: timeout,
      headers: { 'user-agent': 'meteor.js' },
      params: {
        client_id: githubId,
        client_secret: githubSecret,
        scope: 'repo',
        access_token: accessToken
      }
    }
  } else {
    this.options = {
      // timeout: 5000,
      headers: { 'user-agent': 'meteor.js' },
      params: {
        client_id: githubId,
        client_secret: githubSecret,
        scope: 'repo',
        access_token: accessToken
      }
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
  this.contributorsStatistics = function(link, callback) {
    var userRepo = getUserRepo(link);
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/stats/contributors", this.options,
      function(err, res) {
        if (err) {
          console.log("error getting contributor statistics".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved contributor stats successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }

  /**
  Parameters

  Name   : Type   : Description
  sha    : string : SHA or branch to start listing commits from. Default: the repository’s default branch (usually master).
  path   : string : Only commits containing this file path will be returned.
  author : string : GitHub login or email address by which to filter by commit author.
  since  : string : Only commits after this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  until  : string : Only commits before this date will be returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.

   **/
  this.allCommits = function(link, callback, path, since) {
    var userRepo = getUserRepo(link);
    var opt = this.options;
    if (typeof path === "string") {
      opt.params.path = path;
    }
    if (typeof since === "string") {
      opt.params.since = since;
    }
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/commits", opt,
      function(err, res) {
        if (err) {
          console.log("error getting all commits".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved commits successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }

  this.oneCommit = function(link, callback, sha) {
    var userRepo = getUserRepo(link);

    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/commits/"+ sha, this.options,
      function(err, res) {
        if (err) {
          console.log("error getting one commit".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved one commit successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }

  /**
  Returns a weekly aggregate of the number of additions and deletions pushed to a repository.
  **/
  this.weeklyCodeFrequency = function(link, callback) {
    var userRepo = getUserRepo(link);
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/stats/code_frequency", this.options,
      function(err, res) {
        if (err) {
          console.log("error getting weekly code frequency of ".red + userRepo + " " + err);
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
  this.punchCard = function(link, callback) {
    var userRepo = getUserRepo(link);
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/stats/punch_card", this.options,
      function(err, res) {
        if (err) {
          console.log("error getting punch card number of daily commits".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved punch card successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }

  /**
    Returns issues of a repository

    This endpoint may also return pull requests in the response.If an issue is a pull request,
    the object will include a pull_request key.

  Params:

  milestone: (integer or string)
  If an integer is passed, it should refer to a milestone by its number field. If the string * is passed, 
  issues with any milestone are accepted. If the string none is passed, issues without milestones are returned.

  state: (string) 
  Indicates the state of the issues to return. Can be either open, closed, or all. Default: open

  assignee: (string)  
  Can be the name of a user. Pass in none for issues with no assigned user, and * for issues assigned to any user.

  creator: (string) 
  The user that created the issue.

  mentioned: (string) 
  A user that's mentioned in the issue.

  labels: (string)  
  A list of comma separated label names. Example: bug,ui,@high

  sort: (string)  
  What to sort results by. Can be either created, updated, comments. Default: created

  direction: 
  (string)  The direction of the sort. Can be either asc or desc. Default: desc

  since: 
  (string)  Only issues updated at or after this time are returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
  **/
  this.repoIssues = function(link, callback, params) {
    var userRepo = getUserRepo(link);
    var opt = this.options;
    if (typeof params === "object") {
      opt.params = params;
    }
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/issues", opt,
      function(err, res) {
        if (err) {
          console.log("error getting the issues of the repo".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved issues successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }

  /**
  Gets single issue
  **/
  this.singleIssue = function(link, number, callback) {
    var userRepo = getUserRepo(link);
    Meteor.http.call("GET", "https://api.github.com/repos" + userRepo + "/issues/" + number, this.options,
      function(err, res) {
        if (err) {
          console.log("error getting issue".red + userRepo + " " + err);
          callback(err, res);
        } else {
          console.log("Retrieved the issue successfully".green, res.statusCode);
          callback(err, res);
        }
      });
  }
}


////////////////////////////////////////////// Utility functions ////////////////////////////////////////////////////////////


var getUserRepo = function(href) {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  /*returns {
      protocol: match[1],
      host: match[2],
      hostname: match[3],
      port: match[4],
      pathname: match[5],
      search: match[6],
      hash: match[7]
  }*/
  var id = ".git";
  if (match[5].slice(-id.length) == id) {
    return match[5].slice(0, match[5].length - id.length);
  } else {
    return match[5]
  }
};
