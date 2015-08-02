# How to write specifications with DaSpec

DaSpec can automate almost any markdown document. One of the key design guidelines for DaSpec is to avoid enforcing any syntax or formatting constraints that we do not have to, so the format is fairly flexible. These are the key things you should keep in mind when writing specifications to automate them later with DaSpec:

* Blockquotes and headings are just skipped, so they are good candidates for explaining examples, providing context or separating groups of related examples
* Text lines are executed if they match a defined step. Markdown formatters will join consecutive text lines into a single paragraph, but DaSpec evaluates individual lines separately. 
* Blank lines are ignored
* Tables and lists can be used to describe sets of examples, where each row or list item effectively describes a single, stand-alone example. They can also be used to describe lists of related objects, where the entire table or list is taken together as a single value. The key difference in the syntax between those two cases is in the line preceding the list or table. If the first line above the table/list is a heading or a comment, then table rows and list items are individual examples. If the line directly above the table/list is an executable text line, the entire table or list is passed as a single argument to the relevant step. For more information on this, see
  * [Tables as set of examples](tables_as_sets_of_examples.md)
  * [Tables as lists of objects](tables_as_lists_of_objects.md)


## Good specifications/test design guidelines

Although DaSpec does not technically impose any limitations on what you can describe or how you describe it, as long as it is in markdown format, there are some general guidelines that you should think about. These are not tool specific, in fact they will apply to pretty much any similar tool:
 
  * [Describe What, not How](idea_specify_what_not_how.md)
  * [Explain the purpose in the introduction](idea_explain_why_intro.md)
  * [Focus on key examples](idea_focus_on_key_examples.md)
  * [Clearly separate inputs and outputs](idea_clearly_split_inputs_outputs.md)
  * [Cover a single topic](idea_one_spec_one_topic.md)
  * [Avoid mathematical formulas](idea_avoid_mathematical_formulas.md)
