> This is a chapter from the book [Fifty Quick Ideas To Improve Your Tests](http://fiftyquickideas.com/fifty-quick-ideas-to-improve-your-tests/), used with permission from the authors. The content is copyrighted by Neuri Consulting LLP. 

#Focus on key examples

![](images/mobi/key_examples.jpg)

User stories need clear, precise and testable acceptance criteria so that they
can be objectively measured. At the same time, regardless of how many scenarios
teams use for testing, there are always more things that can be tested.  It can
be tempting to describe acceptance criteria with loads of scenarios, and look at
all possible variations for the sake of completeness.  Although trying to
identify all possible variations might seem to lead to more complete testing and
better stories, this is a sure way to destroy a good user story.

Because fast iterative work does not allow time for
unnecessary documentation, acceptance criteria often doubles as
a specification. If this specification is complex and difficult to understand,
it is unlikely to lead to good results.  Complex specifications don't invite
discussion. People tend to read such documents alone and selectively ignore
parts which they feel are less important. This does not really create shared
understanding, but instead just provides an illusion of precision and
completeness. 

Here is a typical example (this one was followed by ten more pages of similar stuff):

    Feature: Payment routing 
    
    In order to execute payments efficiently 
    As a shop owner 
    I want the payments to be routed 
    using the best gateway

    Scenario: Visa Electron, Austria 
      Given the card is 4568 7197 3938 2020
      When the payment is made 
      The selected gateway is Enterpayments-V2

    Scenario: Visa Electron, Germany 
      Given the card is 4468 7197 3939 2928
      When the payment is made 
      The selected gateway is Enterpayments-V1
    
    Scenario: Visa Electron, UK 
      Given the card is 4218 9303 0309 3990 
      When the payment is made 
      The selected gateway is Enterpayments-V1 
    
    Scenario: Visa Electron, UK, over 50 
      Given the card is 4218 9303 0309 3990 
      And the amount is 100 
      When the payment is made 
      The selected gateway is RBS 
      
    Scenario: Visa, Austria 
      Given the card is 4991 7197 3938 2020 
      When the payment is made 
      The selected gateway is Enterpayments-V1   
    ...

The team that implemented the related story suffered from a ton of bugs and
difficult maintenance, largely caused by the way they captured examples.  A huge
list such as this one is not easy to break into separate tasks. This means that
only one pair of developers could work on it instead of sharing the load with
others. Because of this, the initial implementation of underlying features took
a few weeks.  There was so much complexity in the scenarios, but nobody could
say if they painted the complete picture.  Because the list of scenarios was
difficult to understand, automated tests did not give business users any
confidence, and they had to spend time manually testing the story as well.  The
long list of scenarios gave the delivery team a false sense of completeness, so
it prevented them from discussing important boundary conditions with business
stakeholders.  Several important cases were interpreted by different people in
different ways.  This surfaced only after a few weeks of running in production,
when someone spotted increased transaction costs. 

Although each individual scenario might seem understandable, pages and pages of
this sort of stuff make it hard to see the big picture. These examples try to
show how to select a payment processor, but the rules aren't really clear from
the examples.  The objective was to send low-risk transactions to a cheaper
processor, and high-risk transactions to a more expensive processor with better
fraud controls.

An overly complex specification is often a sign that the technical model is
misaligned with the business model, or that the specification is described at
the wrong level of abstraction. Even when correctly understood, such
specifications lead to software that is hard to maintain, because small changes
in the business environment can lead to disproportionately huge changes in the software. 

For example, important business concepts such as transaction risk score,
processor cost or fraud capabilities were not captured in the examples for
payment routing. Because of this, small changes to the business rules required
huge changes to a complex network of special cases in the software. Minor
adjustments to risk thresholds led to a ton of unexpected consequences. When one
of the processors with good fraud-control capabilities reduced prices, most of
the examples had to change and the underlying functions were difficult to
adjust. That means that the organisation couldn't take advantage of the new
business opportunity quickly. 

Instead of capturing complex scenarios, it is far better to focus on
illustrating user stories with key examples. Key examples are a small number of
relatively simple scenarios that are easy to understand, evaluate for
completeness and critique. This doesn't mean throwing away precision -- quite the
opposite -- it means finding the right level of abstraction and the right mental
model that can describe a complex situation better. 

The payment routing case could be broken down into several groups of smaller
examples. One group would show transaction risk based on the country of
residence and country of purchase. Another group of examples would describe how
to score transactions based on payment amount and currency. Several
more groups of examples would describe other transaction scoring rules, focused
only on the relevant characteristics. One overall set of examples would
describe how to combine different scores, regardless of how they were
calculated. A final group of examples would describe how to match the
risk score with compatible payment processors, based on processing
cost and fraud capabilities. Each of these groups might have five to ten
important examples. Individual groups would be much easier to understand. Taken together,
these key examples would allow the team to describe the same set of rules much
more precisely but with far fewer examples than before. 

##Key benefits

Several simple groups of key examples are much easier to understand and
implement than a huge list of complex scenarios. Smaller groups make it easier
to evaluate completeness and argue about boundary conditions, so they allow
teams to discover and resolve inconsistencies and differences in understanding. 

Breaking down complex examples into several smaller and focused groups leads to
more modular software, which reduces future maintenance costs. If the
transaction risk was modelled with examples of individual scoring rules, that
would give a strong hint to the delivery team to capture those rules as separate
functions.  Changes to an individual scoring threshold would not impact all the
other rules.  This would avoid unexpected consequences when rules change.
Changing the preferred processor when they reduce prices would require small
localised changes instead of causing weeks of confusion.

Describing different aspects of a story with smaller and focused groups of key
examples allows teams to divide work better. Two people can take the
country-based scoring rules, two other people could implement routing based on
final score.  Smaller groups of examples also become a natural way of slicing
the story -- some more complex rules could be postponed for a future iteration,
but a basic set of rules could be deployed in a week and provide some useful
business value.

Finally, focusing on key examples significantly reduces the sheer volume of
scenarios that need to be checked. Assuming that there are six or seven
different scoring rules and that each has five key examples, the entire process
can be described with roughly eighty thousand examples (five to the power of
seven). Breaking it down into groups would allow us to describe the same
concepts with forty or so examples (five times seven, plus a few overall
examples to show that the rules are connected correctly). This significantly
reduces the time required to describe and discuss the examples. It also makes
the testing much faster, whether it was automated or manual. Clearer coverage
of examples and models also provide a much better starting point for any further exploratory
testing.

##How to make it work

The most important thing to remember is that if the examples are too complex,
your work on refining a story isn't complete. There are many good strategies for
dealing with complexity. Here are four that we often use:

- Look for missing concepts
- Group by commonality and focus only on variations
- Split validation and processing
- Summarise and explore important boundaries

Overly complex examples, or too many examples, are often a sign that some
important business concepts are not explicitly described. In the payment routing
examples, transaction risk is implied but not explicitly described.  Discovering
these concepts allows teams to offer alternative models and break down both the
specification and the overall story into more manageable chunks. We can use one
set of examples to describe how to calculate the risk score, and another for how
to use a score once it is calculated.

Avoid mixing validation and usage -- this is a common way of hiding business concepts.  For
example, teams often use the same set of examples to describe how to process a
transaction and all the ways to reject a transaction without processing (card
number in incorrect format, invalid card type based on first set of digits,
incomplete user information etc).  The hidden business concept in that case is
'valid transaction'. Making this explicit would allow splitting a single large
set of complex examples into two groups -- determining whether a transaction is
valid, and working with a valid transaction. These groups can then be broken
down further based on structure.

Long lists of examples often contain groups that are similar in structure or
have similar values. In
the payment routing story, there were several pages of scenarios with card
numbers and country of purchase, a cluster of examples involving two countries
(residence and delivery, and some scenarios where the value of a transaction
was important. Identifying commonalities in structure is often a valuable first
step for discovering meaningful groups. Each group can then be restructured to
show only the important differences between examples, reducing the cognitive
load.

The fourth good strategy is to identify important boundary conditions and focus
on them, ignoring examples that do not increase our understanding. For example,
if 50 USD is the risk threshold for low-risk countries, and 25 USD for high-risk
countries, then the important boundaries are:

- 24.99 USD from a high-risk country
- 25 USD from a high-risk country
- 25 USD from a low-risk country
- 49.99 USD from a low-risk country
- 50 USD from a low-risk country

A major problem causing overly complex examples is the misunderstanding that
testing can somehow be completely replaced by a set of carefully chosen
examples. For most situations we've seen, this is a false premise. Checking
examples can be a good start, but there are still plenty of other types of tests
that are useful to do.

Don't aim to fully replace testing with examples in user stories -- aim to create
a good shared understanding, and give people the context to do a good job. Five
examples that are easy to understand and at the right level of abstraction are
much more effective for this than hundreds of very complex test cases.
