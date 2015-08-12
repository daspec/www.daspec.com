	/*global document, DaSpec, localStorage*/
var daspecExamplePageLoad =  function () {
	var runButton = document.getElementById('runButton'),
		markdownArea = document.getElementById('markdownArea'),
		formattedMarkdownArea = document.getElementById('formattedMarkdownArea'),
		outputArea = document.getElementById('outputArea'),
		formattedOutputArea = document.getElementById('formattedOutputArea'),
		stepsArea = document.getElementById('stepsArea'),
		sutArea = document.getElementById('sutArea'),
	updateAlert = function (counts) {
		var alertClass;
		if (counts.error || counts.failed) {
			alertClass = 'alert-danger';
		} else if (counts.skipped) {
			alertClass = 'alert-warning';
		} else if (counts.passed) {
			alertClass = 'alert-success';
		} else {
			alertClass = 'alert-warning';
		}
		$('#outputSummary').removeClass('alert-warning alert-success alert-danger').addClass(alertClass);
		Object.keys(counts).forEach(function (key) {
			var field = $('#outputSummary [role=' + key + ']');
			if (counts[key]) {
				field.show().find('[role=value]').text(counts[key]);
			} else {
				field.hide();
			}
		});
	},
	rerun = function () {
		'use strict';
		var defineSteps = function (context) {
				window.defineStep = context.defineStep;
				//jshint evil:true
				eval(sutArea.value + '\n' + stepsArea.value);
				//jshint evil:false
			},
			runner,
			result,
			markdownFormatter,
			counter;
		try {
			runner = new DaSpec.Runner(defineSteps);
			markdownFormatter = new DaSpec.MarkdownResultFormatter(runner);
			counter = new DaSpec.CountingResultListener(runner);
			runner.execute(markdownArea.value);
			result = markdownFormatter.formattedResults();
		} catch (e) {
			result = '    ' + (e.stack || e.message || e.name || 'there was a problem executing the specification');
		}
		$('#outputArea').text(result);
		updateAlert(counter.current);
		formattedOutputArea.innerHTML = converter.makeHtml(result);
	},
	converter = new showdown.Converter({simplifiedAutoLink: true, strikethrough: true, ghCodeBlocks: true, tables: true});
	markdownArea.addEventListener('change', function () {
		formattedMarkdownArea.innerHTML = converter.makeHtml(markdownArea.value);
	});
	formattedMarkdownArea.innerHTML = converter.makeHtml(markdownArea.value);

	runButton.addEventListener('click', rerun);
};
