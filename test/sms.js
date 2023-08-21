var assert = require('chai').assert;
var nodemailer = require('nodemailer');
var db = require('../sdk/mongo-adaptor.js');


describe('sms', function () {
	it('send', function (done) {
	
	this.timeout(5000);

		db.GetOneDocument('settings', { alias: 'sms' }, {}, {}, function (err, document) {
			if (err) {
				callback(err, document);
			} else {
				var twilio = document.settings.twilio;
				var client = require('twilio')('', '');
				//if (!from) { from = '+18552513612' }
				client.messages.create({
					to: '+2348139167698',
					from: '+18367253042',
					body: 'Hello; Testing fundX'
				}, function (err, message) {
					callback(err, message);
				});
			}
		});

	});
});