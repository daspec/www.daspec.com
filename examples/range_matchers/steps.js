// this adds a function to process any line of text matching the regular expression
// match groups in the regular expression will be passed to the function in the order from left to right
//
// So the sentence 'The right way to greet the World is "Hello, World!" will cause DaSpec to call
// the function and pass World as the subject, and Hello, World! as the expected greeting.



defineStep(/Page load time should be between (\d+) and (\d+) seconds/, function (minTime, maxTime) {
	expect(pageLoadTime).toBeBetween(minTime, maxTime);
});


defineStep(/Page load time should be within (\d+) and (\d+) seconds/, function (minTime, maxTime) {
	expect(pageLoadTime).toBeWithin(minTime, maxTime);
});


defineStep(/Page load time should be less than (\d+) seconds/, function (maxTime) {
	expect(pageLoadTime).toBeLessThan(maxTime);
});


defineStep(/Page load time should be more than (\d+) seconds/, function (minTime) {
	expect(pageLoadTime).toBeGreaterThan(minTime);
});
