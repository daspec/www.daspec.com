defineStep(/The (.+) captain (is not|is) (.+)\./, function (shipName, isOrNot, captainName) {
	var name = shipCaptainDatabase[shipName];
	if (isOrNot === 'is not') {
		expect(name).not.toEqual(captainName);
	} else {
		expect(name).toEqual(captainName);
	}
});

