function StressTest () {
	this.execute = function (numberOfUsers) {
		return new Promise(function (resolve, reject) {
			// simulate some long-running process
			setTimeout(function() {
				resolve(1);
			}, 500);
		});
	};
}
