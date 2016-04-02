import Slack from 'node-slack';

let slack = new Slack(Meteor.settings.slack.hookUrl);

Bot = {
  send(message) {
    slack.send({ 'text': message });
  }
}

export { Bot }
