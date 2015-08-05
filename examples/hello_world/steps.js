// this adds a function to process any line of text matching the regular expression
// match groups in the regular expression will be passed to the function in the order from left to right
//
// So the sentence 'The right way to greet the World is "Hello, World!" will cause DaSpec to call
// the function and pass World as the subject, and Hello, World! as the expected greeting.

defineStep(/The right way to greet the (.*) is "(.*)"/, function (subject, expectedGreeting) {
	var actualResult = greetingFor(subject);

	// the order is important for good reporting: first expected, then actual
	//
	// the third optional value tells DaSpec which argument is tested, so it can report nicely and cross out or bold only
	// that part of the sentence. it's 0-based, so 1 means the second argument (expected greeting)

	this.assertEquals(expectedGreeting, actualResult, 1);
});
