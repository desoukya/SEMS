Meteor.startup(function() {
	let oldSend = Meteor.connection._stream.send;

	Meteor.connection._stream.send = function() {
		oldSend.apply(this, arguments);

		let packet = JSON.parse(arguments[0]);

		if(packet.msg === 'method' && packet.method !== 'LogData') {
			Meteor.call('LogData', arguments[0]);
		}
	};

});
