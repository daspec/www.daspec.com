defineStep(/The captain of the (.+) is (.+)\./, function (shipName, captainName) {
	shipCaptain[shipName] = captainName;
});

defineStep(/The (.+) captain (is not|is) (.+)\./, function (shipName, isOrNot, captainName) {
	var name = shipCaptain[shipName];
	if (isOrNot === 'is not') {
		expect(name).not.toEqual(captainName);
	} else {
		expect(name).toEqual(captainName);
	}
});

