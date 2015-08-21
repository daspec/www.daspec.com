defineStep(/average (.*) should be between (\d+) and (\d+)/, function (event, minTime, maxTime) {
	expect(eventMetrics[event]).toBeBetween(minTime, maxTime);
});
defineStep(/average (.*) should be within (\d+) and (\d+)/, function (event, minTime, maxTime) {
	expect(eventMetrics[event]).toBeWithin(minTime, maxTime);
});
defineStep(/average (.*) should be less than (\d+)/, function (event, maxTime) {
	expect(eventMetrics[event]).toBeLessThan(maxTime);
});
defineStep(/average (.*) should be more than ([\d\.]+)/, function (event, minTime) {
	expect(eventMetrics[event]).toBeGreaterThan(minTime);
});

