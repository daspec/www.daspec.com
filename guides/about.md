# What is DaSpec?

DaSpec is an automation framework for [Executable Specifications](executable_specifications.md) in Markdown. It can help you:

* Share information about planned features with non-technical stakeholders easily, and get actionable unambiguous feedback from them 
* Ensure and document shared understanding of the planned software, making the definition of done stronger and more objective
* Document software features and APIs in a way that is easy to understand and maintain, so you can reduce the bus factor of your team and onboard new team members easily
* Make any kind of automated tests readable to non-technical team members and stakeholders

DaSpec helps teams achieve those benefits by validating human-readable documents against a piece of software. This makes it easy to argue if the software really does what the document claims, and also quickly points out to places in your documentation that need to be updated. Because of that, DaSpec can support you in moving from  confidence-based to evidence-based acceptance testing, and creating a living documentation system to remove knowledge bottlenecks.

DaSpec's primary target are teams practising Behaviour Driven Development, Specification by Example, ATDD and generally running short, frequent delivery cycles with a heavy dependency on test automation. It can, however, be useful to anyone looking to reduce the cost of discovering outdated information in documentation and tests. 

## How does DaSpec work?

DaSpec parses human-readable documents, in markdown format, and pulls out examples and test data. It then passes that information to the system under test using a simple integration API, comparing the expected results with the actual outcomes and converting the test results back to a nice markdown-formatted output. It does the heavy lifting of document parsing, format conversions and test reporting, leaving you with a relatively simple task of implementing the integration points to your system.

For a very simple example, see the [Hello World Walkthrough](hello_world.md). For more realistic examples see the [Key Features](../examples).

## Why Markdown?

**It's easy to write**: Markdown is a simple, intuitive format, based on plain text. You can use any editor to write it, and there are plenty of good Markdown authoring tools out there.

**It's easy to publish**: Markdown is well supported with an ecosystem of tools that convert it to web sites, PDF documents and pretty much any other popular textual format. This means that you can easily publish and send your documentation to the audience in many different ways. 

**It fits in well into modern development processes**: Markdown is a pure text file format, which means your documents will work well with version control and continuous integration. It is easy to branch, merge and diff documents written in markdown, unlike many popular rich document formats. It's easy to resolve conflicts. It's easy to change it frequently, and most version control tools will be able to even merge concurrent updates from different people.

## What can be automated with DaSpec?

In theory, anything. The integration point that DaSpec uses to interpret the examples is under your control. So you can store data into databases and query them, execute web requests to remote servers, or just load a simple class and connect to it by calling its methods directly.

At the moment, DaSpec only supports JavaScript (both in browser and from NodeJS). We plan to port it to other major platforms soon.

## How does DaSpec compare with alternative tools?

DaSpec is inspired heavily by [FIT](http://fit.c2.com/), [FitNesse](http://www.fitnesse.org), [Concordion](http://concordion.org/) and [Cucumber](https://cucumber.io/). In many ways, it's trying to combine the best ideas from those tools, baking in learning from ten years of working with various teams, from world's biggest investment banks to small web startups.

On a technical side, DaSpec currently supports only JavaScript -- more mature tools support many other platforms and languages. This applies to all the tools below so we won't repeat it in the list. 

On the document authoring side, DaSpec here is how DaSpec compares to other tools:

* FIT: FIT has far flexible support for tables. However, the two most important use cases for tables are supported by DaSpec: [tables as lists of objects](lists_of_objects.md) similar to FIT RowFixtures and [tables as sets of examples](tables_as_sets_of_examples.md) similar to ColumnFixtures. Unlike FIT, expectations do not have to be in tables, you can write examples as normal text, bullet lists, and free-form statements. This makes it easy to explain things like workflows which do not naturally fit into tables. 
* FitNesse: The same formatting comparison applies as for FIT. Markdown syntax is simpler than the FitNesse Wiki syntax, so DaSpec is easier to get started with, and because Markdown is well supported with an ecosystem of additional tools, it is much easier to take data out of DaSpec and publish it in a different form. Because DaSpec works with simple plain text files, moving things around with DaSpec is easier for a version control system to track than FitNesse, which relies on folders. On the other hand, FitNesse has great web-based authoring and execution tool. DaSpec does not come with anything like that, but it will work with any existing Markdown editors, so you can get the same benefits using a third-party tool.
* Concordion: Concordion and DaSpec both support free-form expectations, so they are similar in that regard. Concordion uses special HTML attributes that might be tricky to maintain when using WYSIWYG authoring tools for HTML. DaSpec does not contain any automation-specific hints or special attributes in the source files, so it is easier to work with in the long term. Also, because DaSpec uses plain text, instead of HTML, it fits in slightly better into version control systems. Diffing and merging is easier and in many cases can be done automatically even in case of conflicts. In addition, Concordion requires one automation file for each specification file, limiting reuse. DaSpec does not impose that limitation, so it's easier to reuse the automation API for related specifications.
* Cucumber: Cucumber and DaSpec both work on plain text files. Cucumber requires a strict format of statements, best suited for describing workflows. DaSpec can easily consume examples written in the Given/When/Then format, but it can also work with normal sentences, tables, bullet point lists and pretty much anything else you can write in Markdown. For that reason, DaSpec is more flexible than Cucumber for describing things that do not fit well into flows. DaSpec requires less overhead to use tables to group [sets of related examples together](tables_as_sets_of_examples.md). Finally, because Markdown is better supported by third party conversion tools, and DaSpec files can contain additional explanations rather than just executable examples, it's much easier to create a web site or a nice PDF using DaSpec. 
