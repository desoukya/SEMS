import Slack from 'node-slack';

let slack = new Slack(Meteor.settings.slack.hookUrl);

export { slack }
