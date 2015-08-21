# How to write specifications with DaSpec

A specification in DaSpec is just a plain text file, in the [markdown syntax](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). DaSpec can automate almost any markdown document, so there is no particular structure forced on users. Generally, you should think about the following ideas:

1. Make the document easy to read and understand, don't limit yourself to an existing set of automation components. DaSpec makes automation easy.
2. Describe a single feature in a single file. This will make it easy to discover things later and help you work with documents in the future. If a feature is too big to describe in a single file, put all related features in a single folder. 
3. Start with a descriptive title and a quick introduction. Use Markdown headings and block-quotes for that. For example:
    
`# Payment fraud checks`

`> transactions should be scored according to the country of purchase and country of delivery.`

4. Add realistic examples that will illustrate the feature and help to avoid misunderstanding. Aim to make things concrete enough that people could easily complain if they disagree, and so that your examples can clarify all the important edge cases. 

## Specifying testable examples 

Any line of text that is not a heading or a block quote is executable -- DaSpec will try to extract examples from such lines and pass to the system under test. You can specify examples in several ways:

* Plain text sentences, such as:

    When an order is placed from the UK but the delivery address is in Nigeria, the order risk score is 0.5

* Lists of sentences, such as:
  * When an order is placed from the UK but the delivery address is in Nigeria, the order risk score is 0.5
  * When an order is placed from the UK but the delivery address is in France, the order risk score is 0.1
  * When an order is placed from the UK but the delivery address is in the UK, the order risk score is 0
* Tables such as:

| Country of purchase | Delivery address country | Risk factor |
|---------------------|--------------------------|-------------|
| UK                  | Nigeria                  | 0.5         |
| UK                  | France                   | 0.1         |
| France              | France                   | 0           |
| UK                  | UK                       | 0           |

### Note: use one example per line


Markdown formatters generally treat consecutive text lines as a single paragraph, using blanks lines as paragraph separators. So the following two will look completely the same when they are formatted into a PDF or displayed as a web page:

    When the order is placed in the UK, but the delivery address is in Nigeria, the order risk score is 0.5

    When the order is placed in the UK, but the delivery address is in Nigeria, 
	the order risk score is 0.5

DaSpec, however, makes a big difference between the two options. DaSpec evaluates each line of text independently as an example. This allows you to write several independent examples that will be tested separately, but get joined into a nice textual paragraph when the spec is converted to PDF or HTML. For an example of this in action, see [Extracting Examples from Sentences](../examples/extracting_examples_from_sentences).

Ideally try to write each line of text as a complete example. Don't put more than one example into a single line, and don't break a single example across multiple lines unless you have to. Again, the automation component is flexible enough to handle such cases, but the developers that need to automate such specifications later will have a much easier job if you follow this guideline.

This will also make it easier to detect any skipped examples, as DaSpec can report on lines that did not match any automation components.

## Working with lists and tables

Tables and lists can be used to describe sets of examples, where each row or list item effectively describes a single, stand-alone example. They can also be used to describe lists of related objects, where the entire table or list is taken together as a single value. The key difference in the syntax between those two cases is in the first non-blank line preceding the list or table. If the line directly above the table/list is an executable text line, the entire table or list is passed as a single argument to the relevant step. Otherwise, if the table is starting the page, or if the first non-blank line above the table is not an executable text line, then table rows and list items are individual examples. For example, the following table is treated as four separate examples, and each of them will be evaluated individually:

    # Risk scores

    | Country of purchase | Delivery address country | Risk factor |
	|---------------------|--------------------------|-------------|
	| UK                  | Nigeria                  | 0.5         |
	| UK                  | France                   | 0.1         |
	| France              | France                   | 0           |
	| UK                  | UK                       | 0           |

The following table, however, is considered a single example - note how we can use the header line to supply additional arguments for examples (country of purchase is now in the header, not in each individual table row):

    Transaction scores for an order placed in the UK:

    | Delivery address country | Risk factor |
	|--------------------------|-------------|
	| Nigeria                  | 0.5         |
	| France                   | 0.1         |
	| UK                       | 0           |

For more information on this, see:

* [Group related examples into tables](tables_as_sets_of_examples.md)
* [Work with lists of objects](lists_of_objects.md)

Next, check out [Good Writing Practices](good_writing_practices.md) or [Key Examples](../examples)
