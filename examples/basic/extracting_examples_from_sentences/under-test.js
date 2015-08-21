var SalaryCalculator = function () {
	'use strict';
	var bonusTable = {
		'manager': { percent: 20, cap: 50000 },
		'lab rat': { percent: 10, cap: 20000 }
	};
	this.bonusFor = function (role, salary) {
		var bonusType = bonusTable[role.toLowerCase()];
		if (!bonusType) {
			return 0;
		}
		return Math.min(bonusType.cap, bonusType.percent * salary / 100);
	};
};
