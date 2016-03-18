Template.notification.events({

  'click .notification.item': function(event, template) {
    Notifications.read(this._id);
  },

});

Template.notification.helpers({
  formattedContent() {
  	
  	if(this.content.length > 50)
  		return this.content.substring(0,50)+"...";
  	else
  		return this.content;
  },

});