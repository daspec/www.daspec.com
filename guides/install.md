# Set-up DaSpec for your project

At the moment, DaSpec only supports JavaScript. We plan to add support for more platforms soon.

There are several options for running DaSpec:

* [A standalone console utility](#console-runner)
* [Integrated with NPM build life-cycle events](#npm-script)
* [In a continous integration server](#continuous-integration)
* [In a browser](#in-a-browser)

You can also [use custom formatters](#setting-up-custom-formatters) to improve your workflow or turn off outputs that you don't need in a particular use case.

## Console runner

Install daspec globally:

    npm install daspec -g

You can now run daspec in the console:

    daspec --specs ...  --steps ... --output-dir ... [--sources ...] [--formatters ...]

For a list of supported options, run `daspec --help` or see [DaSpec Command Usage](https://github.com/daspec/daspec-js-npm/blob/master/lib/usage.txt) on GitHub. 

You can also save the default configuration options into a file called `daspec.json` in the working directory, and run `daspec` without arguments.

## NPM script

Install daspec to your project repository

    npm install daspec --save-dev

Create a config file telling daspec where your specs and JS sources are. For a list of supported options, see the [DaSpec Command Usage](https://github.com/daspec/daspec-js-npm/blob/master/lib/usage.txt) on GitHub. Each command line argument corresponds to the configuration key of the same name, just without the `--` prefix. For example:


    {
      "specs": ["specs/*.md"],
      "steps": ["steps/**/*.js"],
      "sources": ["src/**/*.js"],
      "output-dir": "daspec-output",

    }

Add a NPM test script using `daspec` to `package.json`, pointing to your config file

    "scripts": {
      "test": "daspec --config config-path.json"
    },

Alternatively, save the config file as `daspec.json` in your project root, and you won't have to supply the `--config` argument. Now run

    npm test

DaSpec will execute the tests, printing the results to the console, and saving the resulting files to the output dir specified in the config file (in the previous example, `daspec-output`).

For en example project with this set-up, see the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) repository on GitHub.

## Setting up custom formatters

You can modify the default behaviour and turn off outputs that you do not want, or add completely new formatters that produce output your preferred test management tools can consume. To do that, just supply the list of node modules as the `--formatters` argument, or add it to the `formatters` key of the config file. For example, here is how the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) adds the JUnit XML Formatter:

    {
      ...
      "formatters": ["daspec/formatters/console", "daspec/formatters/markdown-files", "daspec-junit-xml-formatter"]
      ...
    }

The two default formatters are:

* __daspec/formatters/markdown-files__ -- prints markdown results to files in the output dir
* __daspec/formatters/console__ -- simple summary in the console

## Setting up custom matchers

You can add additional expectation matchers to DaSpec by listing the NPM module names using the `--matchers` argument, or adding them to the `matchers` key of the config file. For example, here is how the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) project adds the [quantity matchers](https://github.com/daspec/daspec-js-quantity-matchers):

    {
      ...
      "matchers": ["daspec-quantity-matcher"]
      ...
    }

## Continuous integration

Both the console tool and the NPM script set-up will report a non-zero exit code in case of any failures or exceptions during processing. This means that you can use those scripts straight away in a continuous integration setup. However, it's a good idea to change the standard list of formatters to something more easily machine consumable. 

The [JUnit XML formatter](https://github.com/daspec/daspec-js-junit-xml-formatter) produces an output that can be consumed by most continuous integration servers.


## In a browser

The core DaSpec code is available as a simple bundle (without any third party dependencies) through Bower. To install it, just use

    bower install daspec

You can then wire up components and execute arbitrary DaSpec specifications.

    runner = new DaSpec.Runner(defineSteps);
    markdownFormatter = new DaSpec.MarkdownResultFormatter(runner);
    runner.execute(spec);
    result = markdownFormatter.formattedResults();

For an example project, see the [daspec-js-bower-example project on GitHub](https://github.com/daspec/daspec-js-bower-example)

