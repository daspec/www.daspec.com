/*global defineStep, VATCalculator */

var underTest = new VATCalculator();

// a step matching the header row will receive all data rows, from top to bottom, with cell values as arguments.
// this matcher expects the Use EU Vat? column to be the last in the table
defineStep(/Use EU VAT\?\s*\|$/, function (ipAddress, billing, delivery, shouldUseVAT) {
	'use strict';
	var designated = underTest.getDesignatedVATCountry(ipAddress, delivery, billing),
	usingVAT = designated ? 'Yes' : 'No';

	// we're matching on the fourth column in the table, 0-indexed, hence 3 as the last argument
	// the order is important, first expected, then actual - for correct reporting
	this.assertEquals(shouldUseVAT, usingVAT, 3);

});

// this matcher expects the Use EU Vat? column to be followed by the Expected EU VAT Country column
defineStep(/Use EU VAT\?\s*\|\s*Expected EU VAT Country/, function (ipAddress, billing, delivery, shouldUseVAT, expectedCountry) {
	'use strict';
	var designated = underTest.getDesignatedVATCountry(ipAddress, delivery, billing),
	usingVAT = designated ? 'Yes' : 'No';

	// a table can have multiple output columns, just assert several times for different columns
	this.assertEquals(shouldUseVAT, usingVAT, 3);
	this.assertEquals(expectedCountry, designated, 4);
});
