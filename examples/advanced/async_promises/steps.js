defineStep(/Max homepage load time/, function (concurrentUsers, maxLoadTime) {
	var stressTest = new StressTest(),
		promise;
	promise = stressTest.execute(concurrentUsers);
	promise.then(function (result) {
		expect(result).toBeLessThan(maxLoadTime);
	});
	// this is the magic - we return the promise from the step definition
	// so the runner knows to wait for it
	return promise;
});

