# Group related examples into tables

To show state machine transitions, or calculation rules that depend on several inputs and potentially produce several outputs, use tables. Tables are a natural way to capture such rules, because they can visually show the relationship of inputs and outputs and make it easy to see impacts of individual variables. Tables also make it easy to group related information together.

When you want table rows to represent individual examples, do this:

 1. Make a table with a heading row, containing column names. 
 2. List example values as rows in the table
 3. Ensure that the first non-empty line directly above the table is not an executable step. (Tables preceded by an executable text line are not processed as sets of individual examples, but as [lists of objects](lists_of_objects.md)). For example, use a heading (line starting with #) or a blockquote (line starting with >).

[Example: Tables As Sets Of Examples](../examples/tables_as_sets_of_examples)

## Step implementation

To implement a matching step, define a matcher for the entire table header row (column titles). The assigned step processor will be called for all table data rows, from top to bottom. The arguments to the step processor will be cell values, in the sequence from left to right. If the regular expression for the table header has matching groups, they will be passed to the processor after the cell values. 

## Writing tips 

There are no specific requirements from DaSpec for naming organising table information, but the following writing tips will help your readers get the most out of the spec 

* It's a good practice to put a heading or a quote directly above such a table, to explain the examples.
* It's generally a good idea to pull the inputs to the left side of the table, and pull the expected outputs to the right side of the table, because that makes it easy to understand it. 
* it's a good idea to call the output column in a way that makes it clear to readers that it is an expected output. For example, call it 'Expected ...' or add a question mark at the end. 
* To improve reporting, mark assertions related to a particular row with that row index. Such failed assertions will be reported in a specific table cell, with the expected and the actual value if available. Failed assertions that are not assigned to a particular cell will mark the whole row as failed. More specific reporting allows you to save time when troubleshooting.
