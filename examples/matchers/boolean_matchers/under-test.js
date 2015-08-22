var AccountWorkflow = function () {
	'use strict';
	var pendingDetails = {}, confirmedDetails;
	this.complete = false;
	this.confirm = function () {
		confirmedDetails = pendingDetails;
		if (confirmedDetails['account type'] && confirmedDetails['overdraft limit']) {
			this.complete = true;
		}
	};
	this.next = function () {
		this.complete = false;
		this.form = undefined;
		this.error = undefined;
		if (pendingDetails.name && pendingDetails.address) {
			pendingDetails = {};
			this.form = {};
		} else if (pendingDetails['account type'] && pendingDetails['overdraft limit']) {
			this.form = { details: pendingDetails};
		} else {
			this.error = 'Cannot submit details';
		}
	};
	this.set = function (detail, value) {
		pendingDetails[detail] = value;
	};
};
