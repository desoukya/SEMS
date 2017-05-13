import Slack from 'node-slack';

let slack = new Slack(Meteor.settings.slack.hookUrl);
let slackJTA = new Slack(Meteor.settings.slack.hookJTA);

export {
	slack,
	slackJTA
}
