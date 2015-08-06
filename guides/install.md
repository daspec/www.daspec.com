# Set-up DaSpec for your project

DaSpec at the moment supports JavaScript only. We plan to add support for more platforms soon.

You can run DaSpec directly from the console, as a standalone utility, or you can integrate it using NPM scripts.

## Console runner
 
Install daspec globally:

    npm install daspec -g

You can now run daspec in the console:

    daspec --specs ...  --steps ... --output-dir ... [--sources ...]

* __--specs__: (required) list of markdown files containing specifications. All the usual wildcard patterns are supported
* __--steps__: (required) list of javascript files containing step definitions. All the usual wildcard patterns are supported
* __--output-dir__: (required) where to store the result files
* __--sources__: (optional) list of javascript files that will be loaded into global scope before step definitions. Not necessary if step definition files load the relevant source as node modules. All the usual wildcard patterns are supported.

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
    	"output-dir": "daspec-output"
    }

Add a NPM test script using daspec to __package.json__, pointing to your config file

    "scripts": {
      "test": "daspec --config config-path.json"
    },

Alternatively, save the config file as __daspec.json__ in your project root, and you won't have to supply the __--config__ argument. Now run 

    npm test

and DaSpec will execute the tests, printing the results to the console, and saving the resulting files to the output dir specified in the config file (in the previous example, __daspec-output__).

For en example, see the [daspec-js-npm-example](https://github.com/daspec/daspec-js-npm-example) repository on GitHub.

