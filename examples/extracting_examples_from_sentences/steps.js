/*global defineStep, SalaryCalculator*/

// each line of markdown is evaluated against a regex - and the matching parts are passed to the function

defineStep(/A (.*) with a (\d*) salary should get (\d*) as the end of year bonus/, function (role, salary, expectedBonus) {
	'use strict';
	var calculator = new SalaryCalculator();
	// arguments are expected value, actual value, and the 0-based index of the related regex match group
	this.assertEquals(expectedBonus, calculator.bonusFor(role, salary), 2);
});
defineStep(/A (.*) with a (\d*) salary should get no bonus/, function (role, salary) {
	'use strict';
	var calculator = new SalaryCalculator();
	// this will mark the whole line as passed or failed, as there is no match group index in the third argument
	this.assertEquals(0, calculator.bonusFor(role, salary));
});
