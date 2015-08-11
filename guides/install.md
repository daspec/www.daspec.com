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

* __--specs__: (required) list of markdown files containing specifications. All the usual wildcard patterns are supported
* __--steps__: (required) list of javascript files containing step definitions. All the usual wildcard patterns are supported
* __--output-dir__: (required) where to store the result files
* __--sources__: (optional) list of javascript files that will be loaded into global scope before step definitions. Not necessary if step definition files load the relevant source as node modules. All the usual wildcard patterns are supported.
* __--formatters__: (optional) list of formatters for processing results. If omitted, DaSpec will print a summary to the console and save markdown files in the output directory.
* __--allowSkipped__: (optional) Lines without matching steps are not marked and do not cause the spec to fail 
* __--failFast__: (optional) Stop execution as soon as a spec fails

or

	daspec --config <configuration file>

* __--config__: (required) path to a config file that contains a JSON with the relevant options

You can also save the default configuration options into a file called __daspec.json__ in the working directory, and run __daspec__ without arguments.

## NPM script

Install daspec to your project repository

    npm install daspec --save-dev

Create a config file telling daspec where your specs and JS sources are:

    {
      "specs": ["specs/*.md"],
      "steps": ["steps/**/*.js"],
      "sources": ["src/**/*.js"],
      "output-dir": "daspec-output",

    }

Add a NPM test script using daspec to __package.json__, pointing to your config file

    "scripts": {
      "test": "daspec --config config-path.json"
    },

Alternatively, save the config file as __daspec.json__ in your project root, and you won't have to supply the __--config__ argument. Now run

    npm test

and DaSpec will execute the tests, printing the results to the console, and saving the resulting files to the output dir specified in the config file (in the previous example, __daspec-output__).

For en example, see the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) repository on GitHub.

## Setting up custom formatters

You can modify the default behaviour and turn off outputs that you do not want, or add completely new formatters that produce output your preferred test management tools can consume. To do that, just supply the list of node modules as the __--formatters__ argument, or add it to the __"formatters"__ key of the config file. For example, here is how the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) replaces the grey console with [color console output](https://github.com/daspec/daspec-js-color-console-formatter):

    {
      ...
      "formatters": ["daspec/formatters/markdown-files", "daspec-color-console"]
      ...
    }

The two default formatters are:

* __daspec/formatters/markdown-files__ -- prints markdown results to files in the output dir
* __daspec/formatters/console__ -- simple summary in the console


## Continuous integration

Both the console tool and the NPM script set-up will report a non-zero exit code in case of any failures or exceptions during processing. This means that you can use those scripts straight away in a continuous integration setup. However, it's a good idea to change the standard list of formatters to something more easily machine consumable.


## In a browser

The core DaSpec code is available as a simple bundle (without any third party dependencies) through Bower. To install it, just use

    bower install daspec

You can then wire up components and execute arbitrary DaSpec specifications.

    runner = new DaSpec.Runner(defineSteps);
    markdownFormatter = new DaSpec.MarkdownResultFormatter(runner);
    runner.execute(spec);
    result = markdownFormatter.formattedResults();

For an example project, see the [daspec-js-bower-example project on GitHub](https://github.com/daspec/daspec-js-bower-example)

