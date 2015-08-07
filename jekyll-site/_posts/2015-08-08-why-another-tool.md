---
layout: post
title:  Why another tool? 
date:   2015-08-08 12:00:00
categories: news 
---

Markdown is quickly becoming the dominant format for documentation in opensource projects, so we thought that it would be nice to allow people to automate examples directly from markdown documents -- think Cucumber but without format limitations, or Concordion that works directly on markdown, without the cumbersome special attributes. It would be great if something can just pull data from any markdown sentence, list or table and report it nicely in a markdown document result.

There is a rich ecosystem of tools that support markdown already, including collaborative editors, converters to PDF or DOC formats, web site builders and similar utilities. Instead of building a spec automation tool and then trying to build out a supporting ecosystem around it, we thought that it would be nice to take a format that pretty much everything else already supports, and make it executable.

The current release of DaSpec is alpha-quality, so a lot more work is needed to make it really useful, but we solved the key technical risks, and we're ready to get some community feedback before proceeding further.  The current version supports JavaScript (that was the easiest to prototype syntax on), with a minimal set of assertions under the covers, but with almost 100% of the markdown syntax we think is useful. So far, the automation tool can recognise:

- pretty much [any text inside a sentence](/examples/extracting_examples_from_sentences/) (things like 'A manager with a Salary of 50000 will get a 10000 bonus' can be parsed to include "manager", "50000" and "10000" as arguments, and then nicely report on matching the bonus with expected results. 
- tables similar to FitNesse column fixtures - [each table row is a single example, some columns are inputs and some are expected outputs](/examples/tables_as_sets_of_examples/)
- tables similar to FitNesse SetFixture and RowFixture - where [an entire table is a single object to be processed](/examples/tables_as_lists_of_objects/) for pre-populating the data, or comparing with a list of objects by properties to look for missing/additional objects
- bullet/numbered lists where an [entire list is a single object](/examples/checking_for_missing_and_additional_list_items/), so a simpler version of the fitnesse rowfixture that only has one attribute, which is useful if you only want to look for things by name, for example
- bullet/numbered lists, where [each list item is a separate example](/examples/extracting_examples_from_sentences/), which is useful for quickly grouping or organising lots of similar examples.

In a way, this brings the free-form spec syntax of Concordion (anything goes, no strict format) with FitNesse table processing capabilities (excellent matchers on cells and rows with detailed reporting) and the Cucumber way of automation (linking through regular expressions, using unit-testing style assertions for fine-grained control), all in a format that is well supported by a ton of editors, converters and publishing tools.

The nice thing about prototyping in JavaScript is that all this works in a browser. So you can try some key examples out, modify the code, modify the spec, re-run it and get the output immediately in your browser. Just visit [Syntax Examples](/examples). 
