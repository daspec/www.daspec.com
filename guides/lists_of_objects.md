# Work with lists of objects 

To show how a list of related objects is processed or evaluate an operation on a list of items, put the entire list of items into a table or a bullet or numbered list, and use it as an argument of a normal text step by including directly below the step.

Tables and lists that follow an executable text step are passed to the related step execution function as a single argument, rather than evaluated line-by-line. You can then use the list of objects to pre-populate a database, or compare lists to expectations. DaSpec will report missing, additional and matching items in a way that is easy to read and understand.

[Example: Tables As Lists Of Objects](../examples/tables_as_lists_of_objects.md)

## Step implementation

To implement a matching step, define a matcher for text step as if there was no table or a list after it. The table or list will be passed to the processor function as the final argument, after all the matching group arguments. 

## Limitations 

* Sub-lists are currently not supported
* If tables have a column header row, the column headers are separated out from the data, and used for matching (so items can even be in different column order)
  * table column headers are matched without considering letter case and spacing, so a column titled _Inventory Name_ will be matched with columns called _INVENTORY name_ or _inventoryName_. 
  * column names have to be unique (considering the matching rules above)
  * all columns are required to have a name -- you cannot name some columns, and leave some column names blank
* If tables do not contain header rows, then the entire table is processed as data, and matched left to right. 

## Writing tips 

The following writing tips will help your readers get the most out of the specification: 

* When objects in the list have several important properties, use tables to visually group the related information together nicely.
* If you only want to show a single property (such as the item name), use lists instead. 
* If you want to show a list where order is important, use numbered lists. If the order is not important, use bullet-lists.
* It's a good practice to formulate the steps so that it is clear if the lists are inputs or expected outputs. For example, use past tense to show inputs, and future tense to show outputs. Alternatively, formulate the example as Given _some inputs_, ... Then _some outputs_.
* When using tables, make the first column something that readers can easily use to identify the entire row -- for example the item name, or unique ID. This will make it easier to understand and troubleshoot examples. In the future, DaSpec will also use partial matching from left to right, so it will be able to report on single attribute differences better than failing an entire row.
* When using tables, specify a title row with column names. This will make it easier to identify and match items, and it will also make sure that your markdown renders well in most markdown processing tools. DaSpec will work even without column names, but other tools may not.
