function Workshop (staticCost, participantCost) {
	var revenue = 0, numParticipants = 0;
	this.setRevenue = function (workshopRevenue) {
		revenue = workshopRevenue;
	};
	this.setParticipants = function (participants) {
		numParticipants = participants;
	};

	this.revenue = function () {
		return revenue;
	};

	this.profit = function () {
		return revenue - staticCost - numParticipants * participantCost;
	};
}
