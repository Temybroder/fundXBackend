module.exports = function (io) {
	var db = require('../../dataStore/db');
	var dbnative = require('../model/mongodb.js');
	var mongoose = require("mongoose");
	var CONFIG = require('../config/config');
	var apn = require('apn');
	var timezone = require('moment-timezone');
	var moment = require("moment");
	var gcm = require('node-gcm');
	let {customActionLogger} = require( '../../logging/logger');
	var usernames = {};
	var rooms = [];
	var chatRooms = [];
	var driverdatas = [];
	var userdatas = [];
	var orderdatas = [];
	var socketrestaurant = [];
	var restaurantdatas = [];
	var socketdrivers = [];
	var socketusers = [];
	var socketorders = [];
	var notifyRooms = [];
	var twilio = require('../../model/twilio.js');
	var clientconnected = false;
	var clienttimeStamp = Date.now();

	var EventEmitter = require('eventemitter3');
	var events = new EventEmitter();
	events.on('warning', e => {
		console.warn("socket erroror : : ")
		console.warn(e)
		console.warn(e.stack)
	});

	var bcrypt = require('bcrypt-nodejs');
	var chat = io.of('/chat');
	var CONFIG = require('../config/config');
	var push = require('../model/pushNotification.js')(io);
	var ss = require('socket.io-stream');
	var fs = require('fs');
	var path = require('path');
	var each = require('async-each-series');


	let moment_timezone=require("moment-timezone");
	function isObjectId(n) {
		return mongoose.Types.ObjectId.isValid(n);
	}
	function roundToHalf(value) {
		var converted = parseFloat(value); // Make sure we have a number
		var decimal = (converted - parseInt(converted, 10));
		decimal = Math.round(decimal * 10);
		// if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
		if ( decimal >= 5 || decimal===0 ) {
			return Math.round(converted);
		} else {
			return (parseInt(converted, 10));
		}
	}


	chat.on('connection', function (socket) {
		var req = socket.request;
		socket.on('redirect-admin', function (data) {
			res.redirect(301, '/admin');
		})
		// by venkatesh starts
		socket.on('join network', function (data) {
			//console.log('join network', data, data.user)
			var room = data.user;
			if (room) {
				if (notifyRooms.indexOf(room) == -1) {
					notifyRooms.push(room);
				}
				socket.join(room);
				socket.emit('network created', room);
			}
		});

		socket.on('network disconnect', function (data) {
			if (data) {
				if (data.user) {
					var room = data.user;
					delete notifyRooms[room];
					socket.emit('network disconnect', room);
					socket.leave(room);
				}
			}
		});


	})



}