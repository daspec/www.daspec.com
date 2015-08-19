/*global defineStep, VATCalculator, expect */

var underTest = new VATCalculator();

// a step matching the header row will receive all data rows, from top to bottom, with cell values as arguments.
// this matcher expects the Use EU Vat? column to be the last in the table
defineStep(/Use EU VAT\?\s*\|$/, function (ipAddress, billing, delivery, shouldUseVAT) {
	'use strict';
	var designated = underTest.getDesignatedVATCountry(ipAddress, delivery, billing),
	usingVAT = designated ? 'Yes' : 'No';

	expect(usingVAT).toEqual(shouldUseVAT);

});

// this matcher expects the Use EU Vat? column to be followed by the Expected EU VAT Country column
defineStep(/Use EU VAT\?\s*\|\s*Expected EU VAT Country/, function (ipAddress, billing, delivery, shouldUseVAT, expectedCountry) {
	'use strict';
	var designated = underTest.getDesignatedVATCountry(ipAddress, delivery, billing),
	usingVAT = designated ? 'Yes' : 'No';

	// a table can have multiple output columns, just assert several times for different columns
	expect(usingVAT).toEqual(shouldUseVAT);
	expect(designated).toEqual(expectedCountry);
});
