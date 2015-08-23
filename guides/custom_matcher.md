# Defining a custom matcher for DaSpec

You can make expectations for complex domain objects or project-specific values easier to read and manage using your own expectation matchers. This page explains how to define and install matcher functions.

* [Defining a custom matcher for DaSpec](#defining-a-custom-matcher-for-daspec)
* [Unit-testing matchers](#unit-testing-matchers)
* [Adding matchers directly in step files](#adding-matchers-directly-with-steps)
* [Adding matchers using NPM modules](#adding-matchers-using-npm-modules)

## Creating a new matcher function

Your matcher function will be called by DaSpec in the context of an [`Expect`](https://github.com/daspec/daspec-js/blob/master/src/expect.js) object. The most important things to know about this are:


* function arguments will be the expected values passed in the expectation
* `return this` at the end of the function if you want to make the expectations chainable. (recommended)
* `this.actual` will be the actual value under test, passed in to the `expect` method when the expectation chain started
* call `this.addAssertion(hasPassed, optionalExpectedValue)` to record an assertion. 
  1. `hasPassed`: the first argument of the function is mandatory, and should be a boolean value reflecting the success or failure of the assertion
  2. `optionalExpectedValue`: the second argument is optional, and will be used by DaSpec to reflect success or failure as narrowly as possible by comparing it to the arguments of the step. If you're using an expected value directly for your assertion, pass the expected value here. If you're not using an expected value from the step parameters directly, don't supply this argument.

For example, in the expectation call:

    expect('hyper').toBeBetterThan('super')

the matcher for `toBetterThan` would be called with the argument `'super'`, and `this.actual` would be `'hyper'`.

This allows you to work on your domain objects and evaluate assertions. Here is how the matcher is defined in the [Custom Matcher Syntax Example](../examples/advanced/custom_matchers/) page:

    function (minimumMargin){
	    var workshop = this.actual;
	    this.addAssertion(workshop.profit() >= (minimumMargin * workshop.revenue() / 100));
	    return this;
    }

## Unit-testing matchers

The best way to unit-test a matcher is to include the [`ExpectationBuilder`](https://github.com/daspec/daspec-js/blob/master/src/expectation-builder.js) class from the `daspec-core` NPM package, initialise it with your new matcher, then execute an expectation using the new matcher, and check for the resulting assertion in the `assertions` property of the builder. Here is an annotated example from the [Quantity Matchers](https://github.com/daspec/daspec-js-quantity-matchers) project.

    beforeEach(function () {
      // prepare the builder 
      // - the first argument is an array of step arguments - not relevant for unit testing matchers
      // - the second argument is the set of key-value pairs of the new matchers that will be loaded
      //   in this case, quantityMatchers will have { 'quantityToEqual': function () { ... } }
      underTest = new ExpectationBuilder([], quantityMatchers);
    });
    describe('quantityToEqual', function () {
      it('adds an assertion for two quantities with units', function () {
        
        // run the expectation using the new matcher
        var result = underTest.expect('10 m').quantityToEqual('1000 cm');
			  
        // check that the matcher added an assertion
        expect(result.assertions.length).toBe(1);

        // check that the assertion passed
        expect(result.assertions[0].passed).toBe(true);

        // check that the assertion correctly logged the expected value
        expect(result.assertions[0].expected).toEqual('1000 cm');
      });

## Adding matchers directly in step files

The first option for making the matchers available to your steps is to simply call the `addMatchers` method in any step definition file, and pass a key-value map where the keys are the matcher names, and the values are the respective matcher functions. For example:

    addMatchers({
        'toHaveProfitMargin': function (minimumMargin){
          var workshop = this.actual;
          this.addAssertion(workshop.profit()>= (minimumMargin * workshop.revenue() / 100));
          return this;
        }
    });

This option is good if you want to define something locally for a set of steps, and you don't want to share it across multiple projects or publish for other teams to use. Note that the matcher is not just available to the file in which it is defined, but to all the other step definitions loaded for the same test run.

## Adding matchers using NPM modules

The second option for making matchers available to your steps is to supply a list of NPM module names that contain matchers to the console runner, using the `--matchers` command line argument, or the `matchers` key in the config file. Save your matcher object as a node module, and export the functions that you want to use for matchers. For an example, see the [quantity matchers](https://github.com/daspec/daspec-js-quantity-matchers). 

This is a good option for loading third-party matcher libraries, or sharing a matcher library across multiple projects easily.  Check out the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) project to see custom matchers loaded using NPM modules in action. 
