var currentWorkflow = new AccountWorkflow();
defineStep(/The operator starts a new account process/, function () {
	currentWorkflow = new AccountWorkflow();
});
defineStep(/The operator enters a (\w+) and an? (\w+)/, function (firstDetail, secondDetail) {
	currentWorkflow.set(firstDetail, 'some value');
	currentWorkflow.set(secondDetail, 'some value');
});
defineStep(/The operator selects an? (.*)/, function (option) {
	currentWorkflow.set(option, 'some value');
});
defineStep(/The operator submits the details/, function () {
	currentWorkflow.next();
});
defineStep(/The operator confirms the details/, function () {
	currentWorkflow.confirm();
});
defineStep(/The system shows a blank account form/, function () {
	expect(currentWorkflow.complete).toBeFalse();
	expect(currentWorkflow.form).toBeTruthy();
	expect(currentWorkflow.form.details).toBeFalsy();
});
defineStep(/The system does not show a blank account form/, function () {
	expect(currentWorkflow.form).toBeFalsy();
});
defineStep(/The system shows a filled-in account form/, function () {
	expect(currentWorkflow.complete).toBeFalse();
	expect(currentWorkflow.form).toBeTruthy();
	expect(currentWorkflow.form.details).toBeTruthy();
});
defineStep(/The system shows an error message/, function () {
	expect(currentWorkflow.complete).toBeFalse();
	expect(currentWorkflow.error).toBeTruthy();
});
defineStep(/The system displays the confirmation of the new account/, function () {
	expect(currentWorkflow.complete).toBeTrue();
});
