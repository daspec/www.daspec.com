var FeedService = function () {
	'use strict';
	var self = this,
		messages = [],
		blacklists = {},
		feeds = [],
		allowedSending = function (user, sender) {
			return !blacklists[user] || blacklists[user].indexOf(sender) < 0;
		};
	self.addFeed = function (user) {
		if (feeds.indexOf(user)<0) {
			feeds.push(user);
		}
	};
	self.send = function (sender, message) {
		messages.push({text: message, destinations: feeds.filter(function (feed) {
			return allowedSending(feed, sender);
		})});
		return messages.length - 1;
	};
	self.getFeedsForMessageId = function (messageId) {
		return messages[messageId].destinations;
	};
	self.blockSender = function (user, blockedSender) {
		blacklists[user] = blacklists[user] || [];
		blacklists[user].push(blockedSender);
	};

};


