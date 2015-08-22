/* addMatcher will add a new function to the list of available expectation matchers*/
addMatchers({
    'toHaveProfitMargin': function (minimumMargin) {
		// the value of "this" is the current expectation
		// "this.actual" is the value being checked
		var workshop = this.actual;
		// call this.addAssertion (hasPassed) to record an assertion
		this.addAssertion(workshop.profit()>= (minimumMargin * workshop.revenue() / 100));
		return this;
	}
});

var constraints = {};
defineStep(/Send profit warnings/, function (revenue, participants, sendWarning) {
	var workshop = new Workshop(constraints.staticCost, constraints.participantCost);
	workshop.setRevenue(revenue);
	workshop.setParticipants(participants);
	if (sendWarning === 'No') {
		// toHaveProfitMargin is now available as a matcher
		expect(workshop).toHaveProfitMargin(constraints.profitMargin);
	} else {
		// it's perfectly compatible with all other matching features, such as .not and .atPosition
		expect(workshop).not.toHaveProfitMargin(constraints.profitMargin);
	}
});

defineStep(/The static cost for a workshop is (\d+) USD/, function (staticCost) {
	constraints.staticCost = staticCost;
});
defineStep(/The cost per participant is (\d+) USD/, function (participantCost) {
	constraints.participantCost = participantCost;
});
defineStep(/The minimal profit margin is (\d+)%/, function (profitMargin) {
	constraints.profitMargin = profitMargin;
});


