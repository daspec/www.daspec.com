(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*global module*/
module.exports = function AssertionCounts() {
	'use strict';
	var self = this;
	self.executed = 0;
	self.passed = 0;
	self.failed = 0;
	self.error = 0;
	self.skipped = 0;

	self.incrementCounts = function (counts) {
		self.executed += counts.executed;
		self.passed += counts.passed;
		self.failed += counts.failed;
		self.error += counts.error;
		self.skipped += counts.skipped;
	};

	self.increment = function (assertion) {
		self.executed++;
		if (assertion.passed) {
			self.passed++;
		} else {
			self.failed++;
		}
	};
	self.recordException = function (exception) {
		if (exception) {
			self.error++;
		}
	};
	self.currentCounts = function () {
		return JSON.parse(JSON.stringify(self));
	};
};

},{}],2:[function(require,module,exports){
/*global module*/
module.exports = function Assertion(expected, actual, passed, outputIndex) {
	'use strict';
	var self = this;
	self.value = actual;
	self.index = outputIndex;
	self.passed = passed;
	self.expected = expected;
};

},{}],3:[function(require,module,exports){
/*global module, require*/
module.exports = function Context() {
	'use strict';
	var self = this,
		StepExecutor =  require('./step-executor'),
		steps = [],
		matchingSteps = function (stepText) {
			return steps.filter(function (step) {
				return step.match(stepText);
			});
		};
	self.defineStep = function (regexMatcher, processFunction) {
		if (!regexMatcher) {
			throw new Error('Empty matchers are not supported');
		}
		if (regexMatcher.source.indexOf('(?:') >= 0) {
			throw new Error('Non-capturing regex groups are not supported');
		}
		var matching = matchingSteps(regexMatcher);
		if (matching.length > 0) {
			throw new Error('The matching step is already defined');
		}
		steps.push(new StepExecutor(regexMatcher, processFunction));
	};
	self.getStepForLine = function (stepText) {
		var matching = matchingSteps(stepText);
		if (matching.length === 0) {
			return false;
		} else if (matching.length > 1) {
			throw new Error('multiple steps match line ' + stepText);
		}
		return matching[0];
	};
};

},{"./step-executor":17}],4:[function(require,module,exports){
/*global module, require*/
module.exports = function CountingResultListener(runner) {
	'use strict';
	var self = this,
		AssertionCounts = require('./assertion-counts');

	self.current = new AssertionCounts();
	self.total = new AssertionCounts();

	runner.addEventListener('stepResult', function (result) {
		self.current.recordException(result.exception);
		result.assertions.forEach(function (assertion) {
			self.current.increment(assertion);
		});
	});

	runner.addEventListener('skippedLine', function () {
		self.current.skipped++;
	});
	runner.addEventListener('specStarted', function () {
		self.current = new AssertionCounts();
	});
	runner.addEventListener('specEnded', function () {
		self.total.incrementCounts(self.current);
	});
};

},{"./assertion-counts":1}],5:[function(require,module,exports){
/*global module, require */
module.exports = {
	Runner: require('./runner'),
	MarkdownResultFormatter: require('./markdown-result-formatter'),
	CountingResultListener: require('./counting-result-listener'),
	TableUtil: require('./table-util')
};

},{"./counting-result-listener":4,"./markdown-result-formatter":11,"./runner":15,"./table-util":18}],6:[function(require,module,exports){
(function (global){
/*global require, global*/

global.DaSpec = require('./daspec-npm-main');

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./daspec-npm-main":5}],7:[function(require,module,exports){
/*global module, require*/
module.exports = function ExampleBlock() {
	'use strict';
	var self = this,
		RegexUtil = require('./regex-util'),
		regexUtil = new RegexUtil(),
		TableUtil = require('./table-util'),
		tableUtil = new TableUtil(),
		Normaliser = require('./normaliser'),
		normaliser = new Normaliser(),
		lines = [],
		toItems = function (lines) {
			return lines.map(tableUtil.cellValuesForRow);
		},
		toTable = function (lines) {
			var tableItems = lines, result = {type: 'table'};
			if (lines.length > 2 && regexUtil.isTableHeaderDivider(lines[1])) {
				result.titles =  tableUtil.cellValuesForRow(lines[0]);
				if (normaliser.containsDuplicates(result.titles)) {
					throw new SyntaxError('Attachment table has multiple equivalent column names');
				}
				if (result.titles.some(regexUtil.isEmpty)) {
					throw new SyntaxError('Attachment table has a column without a name');
				}
				tableItems = lines.slice(2);
			}
			result.items = toItems(tableItems);
			return result;
		},
		getAttachmentTable = function () {
			if (lines.length === 0) {
				return false;
			}
			var topLine = lines[0],
				tableLines = lines.filter(regexUtil.isTableItem);
			if (tableLines.length === 0) {
				return false;
			}
			if (!regexUtil.isTableItem(topLine) && regexUtil.assertionLine(topLine)) {
				return toTable(tableLines);
			}
			return false;
		},
		getAttachmentList = function () {
			//TODO: support nested lists
			if (lines.length === 0) {
				return false;
			}
			var topLine = lines[0],
				listLines = lines.filter(regexUtil.isListItem),
				listSymbol;
			if (listLines.length === 0) {
				return false;
			}
			listSymbol = regexUtil.getListSymbol(listLines[0]);
			if (!regexUtil.isListItem(topLine) && regexUtil.assertionLine(topLine)) {
				return {type: 'list',
					ordered: !isNaN(parseFloat(listSymbol)),
					items: listLines.map(regexUtil.lineItemContent),
					symbol: listSymbol
				};
			}
			return false;
		};
	self.addLine = function (lineText) {
		lines.unshift(lineText);
	};
	self.isComplete = function () {
		if (lines.length === 0) {
			return false;
		}
		if (regexUtil.isListItem(lines[0]) || regexUtil.isTableItem(lines[0]) || lines[0].trim().length === 0) {
			return false;
		}
		return true;
	};
	self.getAttachment = function () {
		return getAttachmentList() || getAttachmentTable();
	};

	self.isTableBlock = function () {
		var tableLines = lines.filter(regexUtil.isTableItem),
			nonTableAssertionLine = function (line) {
				return regexUtil.assertionLine(line) && !regexUtil.isTableItem(line);
			};
		if (tableLines.length === 0) {
			return false;
		}
		if (lines.filter(nonTableAssertionLine).length > 0) {
			return false;
		}
		return true;
	};

	self.getMatchText = function () {
		if (lines.length === 0) {
			return [];
		}
		var nonAttachmentLine = function (line) {
				return !regexUtil.isListItem(line) && !regexUtil.isTableItem(line);
			},
			topLine = lines[0];
		if (nonAttachmentLine(topLine) && regexUtil.assertionLine(topLine)) {
			return lines.filter(nonAttachmentLine);
		} else {
			return lines;
		}
	};
};

},{"./normaliser":12,"./regex-util":14,"./table-util":18}],8:[function(require,module,exports){
/*global module, require*/
module.exports = function ExampleBlocks(inputText) {
	'use strict';
	var self = this,
		ExampleBlock = require('./example-block');
	self.getBlocks = function () {
		var lines = inputText && inputText.split('\n').reverse(),
			current = new ExampleBlock(),
			blocks = [];
		lines.forEach(function (line) {
			current.addLine(line);
			if (current.isComplete()) {
				blocks.push(current);
				current = new ExampleBlock();
			}
		});
		if (current.getMatchText().length > 0) {
			blocks.push(current);
		}
		return blocks.reverse();
	};
};

},{"./example-block":7}],9:[function(require,module,exports){
/*global module*/
module.exports = function ListUtil() {
	'use strict';
	var self = this,
			arrayEquals = function (array1, array2) {
				var i;
				if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
					return false;
				}
				for (i = 0; i < array1.length; i++) {
					if (array2[i] != array1[i]) {
						return false;
					}
				}
				return true;
			},
			equals = function (item) {
				if (Array.isArray(item)) {
					return arrayEquals(item, this);
				} else {
					return item == this;
				}
			};
	self.unorderedMatch = function (array1, array2) {
		array1 = array1 || [];
		array2 = array2 || [];
		var matching = array1.filter(function (el) {
				return array2.some(equals, el);
			}),
			missing = array1.filter(function (el) {
				return !array2.some(equals, el);
			}),
			additional = array2.filter(function (el) {
				return !array1.some(equals, el);
			});
		return {
			matches: missing.length === 0 && additional.length === 0,
			missing: missing,
			additional: additional,
			matching: matching
		};
	};
};

},{}],10:[function(require,module,exports){
/*global module, require*/
module.exports = function MarkDownFormatter() {
	'use strict';
	var self = this,
			RegexUtil = require('./regex-util'),
			TableUtil = require('./table-util'),
			regexUtil = new RegexUtil(),
			tableUtil = new TableUtil(),
			dash = String.fromCharCode(8211),
			tick = String.fromCharCode(10003),
			crossValueAndExpected = function (expected, actual) {
				var formatActual = '';
				if (actual !== undefined) {
					formatActual = ' ['  + actual + ']';
				}
				return '**~~' + expected + '~~'  + formatActual + '**';
			},
			crossValue = function (expected) {
				return '**~~' + expected + '~~**';
			},
			boldValue = function (expected) {
				return '**' + expected + '**';
			};
	self.formatPrimitiveResult = function (assertion) {
		var formattedValue = function () {
			if (assertion.passed) {
				return boldValue(assertion.expected);
			} else {
				return crossValueAndExpected(assertion.expected, assertion.value);
			}
		};
		return {
			index: assertion.index,
			value: formattedValue()
		};
	};
	self.formatListResult = function (listResult) {
		var tickEl = function (e) {
			return '[' + tick + '] ' + e;
		}, crossEl = function (e) {
			return '**[' + dash + '] ~~' + e + '~~**';
		}, plusEl = function (e) {
			return '**[+] ' + e + '**';
		},
			matching = (listResult.matching || []).map(tickEl),
			missing = (listResult.missing || []).map(crossEl),
			additional = (listResult.additional || []).map(plusEl);
		return matching.concat(missing, additional);
	};
	self.getTableResult = function (tableResult) {
		var tickRow = function (row) {
			return [tick].concat(row);
		}, crossRow = function (row) {
			return [dash].concat(row.map(crossValue));
		}, plusRow = function (row) {
			return ['+'].concat(row.map(boldValue));
		},
			matching = (tableResult.matching || []).map(tickRow),
			missing = (tableResult.missing || []).map(crossRow),
			additional = (tableResult.additional || []).map(plusRow);
		return matching.concat(missing, additional);

	};
	self.markResult = function (stepResult) {
		var withoutIndex = function (assertion) {
				return !assertion.index && assertion.index !== 0;
			},
			withIndex = function (assertion) {
				return assertion.index;
			},
			failed = function (assertion) {
				return !assertion.passed;
			},
			passed = function (assertion) {
				return assertion.passed;
			},
			notEmpty = function (array) {
				return array && array.length;
			},
			forAttachment = function (assertion) {
				return stepResult.attachment && stepResult.attachment.items && stepResult.attachment.items.length > 0 &&
					(assertion.expected === stepResult.attachment.items || assertion.expected == stepResult.attachment);
			},
			headingLine = function () {
				if (stepResult.exception) {
					return crossValue(stepResult.stepText);
				}
				var noIndexAssertions = stepResult.assertions.filter(withoutIndex);
				if (noIndexAssertions.length === 0) {
					return regexUtil.replaceMatchGroup(stepResult.stepText, stepResult.matcher, stepResult.assertions.map(self.formatPrimitiveResult));
				}
				if (noIndexAssertions.some(failed)) {
					if (regexUtil.isListItem(stepResult.stepText)) {
						return regexUtil.getListSymbol(stepResult.stepText) + '**~~' + regexUtil.lineItemContent(stepResult.stepText) + '~~**';
					} else if (regexUtil.isTableItem(stepResult.stepText)) {
						return '| ' + tableUtil.cellValuesForRow(stepResult.stepText).map(crossValue).join(' | ') + ' |';
					} else {
						return crossValue(stepResult.stepText);
					}
				}
				if (stepResult.assertions.some(failed)) {
					return regexUtil.replaceMatchGroup(stepResult.stepText, stepResult.matcher, stepResult.assertions.filter(withIndex).map(self.formatPrimitiveResult));
				}
				if (stepResult.assertions.length) {
					if (regexUtil.isListItem(stepResult.stepText)) {
						return regexUtil.getListSymbol(stepResult.stepText) + '**' + regexUtil.lineItemContent(stepResult.stepText) + '**';
					} else if (regexUtil.isTableItem(stepResult.stepText)) {
						return '| ' + tableUtil.cellValuesForRow(stepResult.stepText).map(boldValue).join(' | ') + ' |';
					} else {
						return boldValue(stepResult.stepText);
					}
				}
				return stepResult.stepText;
			},
			attachmentLines = function () {
				if (!stepResult.attachment) {
					return '';
				}
				var formatList = function () {
						if (stepResult.attachment.type !== 'list') {
							return false;
						}
						var failedListAssertions = stepResult.assertions.filter(failed).filter(forAttachment),
							passedListAssertions = stepResult.assertions.filter(passed).filter(forAttachment),
							values = stepResult.attachment.items,
							symbol = stepResult.attachment.symbol || '* ';
						if (notEmpty(failedListAssertions)) {
							values = self.formatListResult(failedListAssertions[0].value);
						} else if (notEmpty(passedListAssertions)) {
							values = self.formatListResult({matching: stepResult.attachment.items});
						}
						return '\n' + symbol + values.join('\n' + symbol);
					},
					formatTableItem = function (item) {
						return '|' + item.join('|') + '|';
					},
					formatTable = function () {
						if (stepResult.attachment.type !== 'table') {
							return false;
						}
						var resultTitles = stepResult.attachment.titles && stepResult.attachment.titles.slice(0),
								failedTableAssertions = stepResult.assertions.filter(failed).filter(forAttachment),
								passedTableAssertions = stepResult.assertions.filter(passed).filter(forAttachment),
								values = stepResult.attachment.items,
								resultRows = [];
						if (notEmpty(failedTableAssertions)) {
							if (resultTitles) {
								resultTitles.unshift('?');
							}
							values = self.getTableResult(failedTableAssertions[0].value);
						} else if (notEmpty(passedTableAssertions)) {
							if (resultTitles) {
								resultTitles.unshift('?');
							}
							values =  self.getTableResult({matching: stepResult.attachment.items});
						}
						if (resultTitles) {
							resultRows.push(formatTableItem(resultTitles));
							resultRows.push(resultTitles.map(function () {
								return '|-';
							}).join('') + '|');
						}
						resultRows = resultRows.concat(values.map(formatTableItem));
						return '\n' + tableUtil.justifyTable(resultRows).join('\n');
					};
				return formatList() || formatTable();
			},
			exceptionReport = function () {
				if (!stepResult.exception) {
					return '';
				}
				return '\n<!--\n' + (stepResult.exception.stack || stepResult.exception) + '\n-->';
			};
		return headingLine() + attachmentLines() + exceptionReport();
	};
};

},{"./regex-util":14,"./table-util":18}],11:[function(require,module,exports){
/*global module, require*/
module.exports = function MarkdownResultFormatter(runner, globalConfig) {
	'use strict';
	var self = this,
		MarkDownFormatter = require('./markdown-formatter'),
		markDownFormatter = new MarkDownFormatter(),
		resultBuffer = [],
		ResultCountListener = require('./counting-result-listener'),
		resultCountListener = new ResultCountListener(runner),
		tableRows = false,
		TableUtil = require('./table-util'),
		tableUtil = new TableUtil(),
		config = (globalConfig && globalConfig.markdown) || {},
		allowSkipped = globalConfig && globalConfig.allowSkipped,
		skippedLineIndicator = config.skippedLineIndicator || '`skipped`',
		skippedPrepend =  allowSkipped ? '' : skippedLineIndicator + ' ',
		countDescription = function () {
			var labels = ['executed', 'passed', 'failed', 'error', 'skipped'],
				description = '> **In da spec:** ',
				comma = false;

			labels.forEach(function (label) {
				if (resultCountListener.current[label]) {
					if (comma) {
						description = description + ', ';
					} else {
						comma = true;
					}
					description = description + label + ': ' + resultCountListener.current[label];
				}
			});
			if (!comma) {
				description = description + 'Nada';
			}
			return description;
		};
	runner.addEventListener('stepResult', function (result) {
		(tableRows || resultBuffer).push(markDownFormatter.markResult(result));
	});
	runner.addEventListener('nonAssertionLine',  function (line) {
		(tableRows || resultBuffer).push(line);
	});
	runner.addEventListener('skippedLine', function (line) {
		resultBuffer.push(skippedPrepend +  line);
	});
	runner.addEventListener('tableStarted', function () {
		tableRows = [];
	});
	runner.addEventListener('tableEnded', function () {
		if (tableRows) {
			resultBuffer = resultBuffer.concat(tableUtil.justifyTable(tableRows));
		}
		tableRows = false;
	});
	runner.addEventListener('specStarted', function () {
		resultBuffer = [];
	});
	runner.addEventListener('specEnded', function () {
		resultBuffer.unshift('');
		resultBuffer.unshift(countDescription());
	});

	self.formattedResults = function () {
		return resultBuffer.join('\n');
	};

};

},{"./counting-result-listener":4,"./markdown-formatter":10,"./table-util":18}],12:[function(require,module,exports){
/*global module*/
module.exports = function Normaliser() {
	'use strict';
	var self = this;
	self.normaliseString = function (string) {
		return string.toLocaleLowerCase().replace(/\s/g, '');
	};
	self.normaliseObject = function (object) {
		var result = {};
		Object.keys(object).forEach(function (key) {
			result[self.normaliseString(key)] = object[key];
		});
		return result;
	};
	self.containsDuplicates = function (stringArray) {
		if (!stringArray || !stringArray.length) {
			return false;
		}
		var normalised = stringArray.map(self.normaliseString),
			i, j;
		for (i = 0; i < normalised.length - 1; i++) {
			for (j = i + 1; j < normalised.length; j++) {
				if (normalised[i] === normalised[j]) {
					return true;
				}
			}
		}
		return false;
	};
};

},{}],13:[function(require,module,exports){
/*global module, console*/
/*jshint unused:false */
module.exports = function observable(base) {
	'use strict';
	var listeners = [], x;
	base.addEventListener = function (types, listener, priority) {
		types.split(' ').forEach(function (type) {
			if (type) {
				listeners.push({
					type: type,
					listener: listener,
					priority: priority || 0
				});
			}
		});
	};
	base.listeners = function (type) {
		return listeners.filter(function (listenerDetails) {
			return listenerDetails.type === type;
		}).map(function (listenerDetails) {
			return listenerDetails.listener;
		});
	};
	base.removeEventListener = function (type, listener) {
		listeners = listeners.filter(function (details) {
			return details.listener !== listener;
		});
	};
	base.dispatchEvent = function (type) {
		var args = Array.prototype.slice.call(arguments, 1);
		listeners
			.filter(function (listenerDetails) {
				return listenerDetails.type === type;
			})
			.sort(function (firstListenerDetails, secondListenerDetails) {
				return secondListenerDetails.priority - firstListenerDetails.priority;
			})
			.some(function (listenerDetails) {
				try {
					return listenerDetails.listener.apply(undefined, args) === false;
				} catch (e) {
					console.log('dispatchEvent failed', e, listenerDetails);
				}
			});
	};
	return base;
};

},{}],14:[function(require,module,exports){
/*global module*/
module.exports = function RegexUtil() {
	'use strict';
	var self = this,
			listSymbolRegex = /^\s*[^\s]+\s+/;
	this.replaceMatchGroup = function (string, regex, overrides) {
		var everythingInMatchGroups = new RegExp('(' + regex.source.replace(/([^\\]?)[()]/g, '$1)(') + ')'),
				allMatches = string.match(everythingInMatchGroups),
				initial =  string.substring(0, allMatches.index),
				trailing = string.substring(allMatches.index + allMatches[0].length),
				values = allMatches.slice(1);
		overrides.forEach(function (replacement) {
			var findIndex = replacement.index * 2 + 1;
			if (replacement.index >= 0 && findIndex < (values.length - 1)) {
				values[findIndex] = replacement.value;
			}
		});
		return initial + values.join('') + trailing;
	};
	this.isCodeItem = function (line) {
		if (!line || line.trim().length === 0) {
			return false;
		}
		return /^\s\s\s\s/.test(line) || /^\s*\t/.test(line);
	};
	this.isTableItem = function (line) {
		return !self.isCodeItem(line) && /^\s*\|/.test(line);
	};
	this.isTableDataRow = function (line) {
		return self.isTableItem(line) && !self.isTableHeaderDivider(line);
	};
	this.isTableHeaderDivider = function (line) {
		return self.isTableItem(line) && /^[|= -]*$/.test(line);
	};
	this.isEmpty = function (line) {
		return /^\s*$/.test(line);
	};
	this.isListItem = function (line) {
		if (/^\s*\d+.\s/.test(line)) {
			return true;
		}
		if (/^[\*\s-=]*$/.test(line)) {
			return false;
		}
		if (!/^\s*[\*-]\s/.test(line)) {
			return false;
		}
		if (/^\s*\*\s/.test(line) && line.replace(/[^*]/g, '').length % 2 === 0) {
			return false;
		}
		return true;
	};
	this.lineItemContent = function (line) {
		if (!self.isListItem(line)) {
			return line;
		}
		return line.replace(listSymbolRegex, '').trim();
	};
	this.getListSymbol = function (line) {
		if (!self.isListItem(line)) {
			return '';
		}
		return line.match(listSymbolRegex)[0];
	};
	this.assertionLine = function (stepText) {
		if (stepText.length === 0 || stepText.trim().length === 0) {
			return false;
		}
		var linestartignores = ['#', '\t', '>', '    ', '![', '[', '***', '* * *', '---', '- - -', '===', '= = ='],
			result = true;
		linestartignores.forEach(function (lineStart) {
			if (stepText.substring(0, lineStart.length) === lineStart) {
				result = false;
			}
		});
		return result;
	};
	this.regexForTableDataRow = function (cells) {
		if (!cells || cells < 0) {
			return false;
		}
		var regexTemplate = '\\|',
			cellTemplate = '(.*)\\|',
			i;
		for (i = 0; i < cells; i++) {
			regexTemplate = regexTemplate + cellTemplate;
		}
		return new RegExp(regexTemplate);
	};
};

},{}],15:[function(require,module,exports){
/*global module, require*/
module.exports = function Runner(stepFunc, config) {
	'use strict';
	var Context = require('./context'),
		CountingResultListener = require('./counting-result-listener'),
		RegexUtil = require('./regex-util'),
		observable = require('./observable'),
		regexUtil = new RegexUtil(),
		ExampleBlocks = require('./example-blocks'),
		self = observable(this);

	self.executeSuite = function (suite) {
		var counts = new CountingResultListener(self),
			executeSpecs = true;

		suite.forEach(function (spec) {
			if (!executeSpecs) {
				return;
			}
			if (typeof spec.content === 'function') {
				self.execute(spec.content(), spec.name);
			} else {
				self.execute(spec.content, spec.name);
			}
			if (config && config.failFast) {
				if (counts.current.error ||  counts.current.failed || (!config.allowSkipped && counts.current.skipped) || !counts.current.passed) {
					executeSpecs = false;
				}
			}
		});
		self.dispatchEvent('suiteEnded', counts.total);
		if (counts.total.failed || counts.total.error || (!config.allowSkipped && counts.total.skipped) || !counts.current.passed) {
			return false;
		}
		return true;
	};
	self.execute = function (inputText, exampleName) {
		var context = new Context(),
			blocks = new ExampleBlocks(inputText),
			lineNumber = 0,
			counts = new CountingResultListener(self),
			sendLineEvent = function (eventName, line) {
				if (!line && line !== '') {
					self.dispatchEvent(eventName, lineNumber, exampleName);
				} else {
					self.dispatchEvent(eventName, line, lineNumber, exampleName);
				}
			},
			processTableBlock = function (block) {
				var blockLines = block.getMatchText(),
					step,
					headerLine,
					// tableResultBlock,
					startNewTable = function (line) {
						step = context.getStepForLine(line);
						if (!step) {
							sendLineEvent('skippedLine', line);
						} else {
							headerLine = line;
							sendLineEvent('tableStarted');
							sendLineEvent('nonAssertionLine', line);

						}
					},
					endCurrentTable = function () {
						if (step) {
							sendLineEvent('tableEnded');
							step = false;
						}
					};
				blockLines.forEach(function (line) {
					lineNumber++;
					if (!regexUtil.isTableItem(line)) {
						endCurrentTable();
						sendLineEvent('nonAssertionLine', line);
					} else if (!step) {
						startNewTable(line);
					} else if (regexUtil.isTableDataRow(line)) {
						sendLineEvent('stepResult', step.executeTableRow(line, headerLine));
					} else {
						sendLineEvent('nonAssertionLine', line);
					}
				});
				endCurrentTable();
			},
			processBlock = function (block) {
				var blockLines = block.getMatchText(),
					blockParam = block.getAttachment();
				blockLines.forEach(function (line) {
					lineNumber++;
					if (!regexUtil.assertionLine(line)) { //Move to block?
						sendLineEvent('nonAssertionLine', line);
						return;
					}

					var step = context.getStepForLine(line);
					if (!step) {
						sendLineEvent('skippedLine', line);
						return;
					}
					sendLineEvent('stepResult', step.execute(line, blockParam));
				});
			};
		stepFunc.apply(context, [context]);
		self.dispatchEvent('specStarted', exampleName);
		blocks.getBlocks().forEach(function (block) {
			if (block.isTableBlock()) {
				processTableBlock(block);
			} else {
				processBlock(block);
			}
		});
		self.dispatchEvent('specEnded', exampleName, counts.current);
	};
};

},{"./context":3,"./counting-result-listener":4,"./example-blocks":8,"./observable":13,"./regex-util":14}],16:[function(require,module,exports){
/*global module, require*/
module.exports = function StepContext(result) {
	'use strict';
	var self = this,
			ListUtil = require('./list-util'),
			TableUtil = require('./table-util'),
			Assertion = require('./assertion'),
			tableUtil = new TableUtil(),
			listUtil = new ListUtil();
	self.assertEquals = function (expected, actual, optionalOutputIndex) {
		var	passed = expected == actual;
		result.assertions.push(new Assertion(expected,
					actual,
					passed, optionalOutputIndex));
	};
	self.assertUnorderedTableEquals = function (expected, actual) {
		var comparisonObject;
		if (!expected.titles) {
			comparisonObject = actual;
			if (actual.type === 'table' && Array.isArray(actual.items)) {
				comparisonObject = actual.items;
			}
		} else {
			if (actual.type === 'table' && Array.isArray(actual.items)) {
				comparisonObject = tableUtil.tableValuesForTitles(actual, expected.titles);
			}	else {
				comparisonObject = tableUtil.objectArrayValuesForTitles(actual, expected.titles);
			}
		}
		return self.assertSetEquals(expected.items, comparisonObject);
	};
	self.assertSetEquals = function (expected, actual) {
		var listResult = listUtil.unorderedMatch(expected, actual);
		result.assertions.push(new Assertion(expected,
					listResult,
					listResult.matches));
	};
};

},{"./assertion":2,"./list-util":9,"./table-util":18}],17:[function(require,module,exports){
/*global module, require*/
module.exports = function StepExecutor(regexMatcher, processFunction) {
	'use strict';
	var self = this,
		StepContext = require('./step-context'),
		TableUtil = require('./table-util'),
		RegExUtil = require('./regex-util');
	self.match = function (stepText) {
		if (stepText instanceof RegExp) {
			return regexMatcher.source === stepText.source;
		}
		return regexMatcher.test(stepText);
	};
	self.execute = function (stepText, attachment) {
		var match = stepText.match(regexMatcher),
			stepArgs = match.slice(1),
			result = {
				matcher: regexMatcher,
				stepText: stepText,
				attachment: attachment,
				assertions: []
			},
			stepContext = new StepContext(result);

		if (attachment) { /* we know it's a list and the symbol */
			stepArgs.push(attachment);
		}

		try {
			processFunction.apply(stepContext, stepArgs);
		} catch (e) {
			/* geniuine error, not assertion fail */
			result.exception = e;
		}


		return result;
	};
	self.executeTableRow = function (dataRow, titleRow) {
		var tableUtil = new TableUtil(),
			regexUtil = new RegExUtil(),
			stepArgs = tableUtil.cellValuesForRow(dataRow),
			matcher = regexUtil.regexForTableDataRow(stepArgs.length),
			result = {
				matcher: matcher,
				stepText: dataRow,
				assertions: []
			},
			stepContext = new StepContext(result),
			titleMatch = titleRow && titleRow.match(regexMatcher),
			titleArgs = titleMatch && titleMatch.length > 1 && titleMatch.slice(1).map(function (item) {
				return item.trim();
			});

		if (titleArgs) {
			stepArgs = stepArgs.concat(titleArgs);
		}
		processFunction.apply(stepContext, stepArgs);

		return result;
	};
};

},{"./regex-util":14,"./step-context":16,"./table-util":18}],18:[function(require,module,exports){
/*global module, require*/
module.exports = function TableUtil() {
	'use strict';
	var self = this,
		RegexUtil = require ('./regex-util'),
		regexUtil = new RegexUtil(),
		Normaliser = require ('./normaliser'),
		normaliser = new Normaliser();

	self.cellValuesForRow = function (dataRow) {
		if (!dataRow || dataRow.trim() === '') {
			return [];
		}
		var values = dataRow.split('|');
		if (values.length < 3) {
			return [];
		}
		values.pop();
		values =  values.slice(1);
		return values.map(function (v) {
			return v.trim();
		});
	};
	self.tableValuesForTitles = function (table, titles) {
		if (!titles || titles.length === 0) {
			return false;
		}
		var pickItems = function (tableRow) {
				return columnIndexes.map(function (val) {
					return tableRow[val];
				});
			},
			normalisedTitles = titles.map(normaliser.normaliseString),
			normalisedTableTitles = table.titles.map(normaliser.normaliseString),
			columnIndexes = normalisedTitles.map(function (title) {
				return normalisedTableTitles.indexOf(title);
			});
		return table.items.map(pickItems);
	};
	self.objectArrayValuesForTitles = function (list, titles) {
		if (!titles || titles.length === 0) {
			return false;
		}
		var normalisedTitles = titles.map(normaliser.normaliseString),
			pickItems = function (item) {
				return normalisedTitles.map(function (title) {
					return item[title];
				});
			};
		return list.map(normaliser.normaliseObject).map(pickItems);
	};
	self.justifyTable = function (stringArray) {
		var maxCellLengths = function (maxSoFar, tableRow, index) {
				if (dividerRows[index]) {
					return maxSoFar;
				}
				var currentLengths = tableRow.map(function (s) {
					return s.length;
				});
				if (!maxSoFar) {
					return currentLengths;
				} else {
					return currentLengths.map(function (v, i) {
						return Math.max(v, (maxSoFar[i] || 0));
					});
				}
			},
			cellValues = stringArray.map(self.cellValuesForRow),
			dividerRows = stringArray.map(regexUtil.isTableHeaderDivider),
			columnLengths = cellValues.reduce(maxCellLengths, []),
			padding = function (howMuch, padChar) {
				return new Array(howMuch + 1).join(padChar);
			},
			padCells = function (cells, rowIndex) {
				return cells.map(function (cellVal, index) {
					if (dividerRows[rowIndex]) {
						return padding(2 + columnLengths[index], '-');
					} else {
						return ' '  + cellVal + padding(1 + columnLengths[index] - cellVal.length, ' ');
					}
				});
			},
			joinCells = function (cells) {
				return '|' + cells.join('|')	+ '|';
			};
		return cellValues.map(padCells).map(joinCells);
	};
};

},{"./normaliser":12,"./regex-util":14}]},{},[6]);
