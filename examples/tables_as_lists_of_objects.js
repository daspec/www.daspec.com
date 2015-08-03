/*global defineStep*/
var inventoryTable, order;
defineStep(/Assuming the following inventory/, function (table) {
	console.log('inventory', table);
});
defineStep(/When a customer order with the following items is processed/, function (table) {
	'use strict';
	console.log('order', table);
});
defineStep(/The following items will be (.*):/, function (status, table) {
	'use strict';
	console.log('status', status, table);
});
