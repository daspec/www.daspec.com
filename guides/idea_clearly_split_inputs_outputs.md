> This is a chapter from the book [Fifty Quick Ideas To Improve Your Tests](http://fiftyquickideas.com/fifty-quick-ideas-to-improve-your-tests/), used with permission from the authors. The content is copyrighted by Neuri Consulting LLP. For more information, see  

#Clearly separate inputs and outputs

![](images/separate_inputs_outputs_fin.jpg)

In [Fifty Quick Ideas To Improve Your User Stories](
http://www.amazon.com/gp/product/B00OGT2U7M/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00OGT2U7M&linkCode=as2&tag=swingwiki-20&linkId=3M3ZO55CDBNSCOKZ),
we recommended not getting too stuck on format consistency. User stories are all
about facilitating fruitful discussions. In order to achieve this, it's better
to be flexible and not enforce a particular structure or format of story cards.
The same holds for story conversations, enforcing a particular format or tool is
not effective. But the third aspect of good stories -- the confirmation criteria
-- does not follow the same pattern. Good structure and strict rules on
formatting are quite beneficial here.

Inexperienced teams often mess up the acceptance criteria by mixing up
information in an unstructured way, so that it is unclear what is actually being
checked. Here's a typical example:

    Scenario: New user, suspicious transaction 

    Given a user registered from UK 
    And the user completes a 60 USD order 
    And asks for delivery to US 
    Then the transaction is marked as suspicious 

    When the order completes 
    And the user places a 30 USD order 
    And asks for delivery to UK 
    Then the transaction is marked as checked 

    When the order completes 
    And the user places a 30 USD order 
    And asks for delivery to US 
    Then the transaction is marked as checked

Try to read through the example and work out what causes transactions to be
marked as suspicious. Is it the amount? Is it the country of registration
being different than the delivery country? What's the purpose of the third example
and how is it different from the first one? Is there a difference between 'the
user completes an order' in the first example and 'the user places an order' in
the second and third examples?

Acceptance criteria for stories are pretty useless if people can't quickly
understand their purpose. The previous example comes from a delivery system, where
orders are suspicious if the delivery country differs from the country of
registration, unless the address was previously used for an approved order. Is
that what you guessed? The amount is pretty irrelevant, and the address is not
captured in the examples. It was hidden in the configuration of test automation.

Scenarios with unclear structure are misleading. They just cause problems.
People can easily understand them differently. Someone can implement the story
and make the tests pass, while completely missing the point and introducing lots
of bugs. If the suspicious transaction scenario is automated as a test, it will
be difficult to understand what was covered in automation and what was left for
testers to check manually, and it won't be easy to figure out good variables for
exploratory testing either. Enforcing a strict structure is a good way to
prevent such issues.

Another typical example of bad test structure is an output or assertion without
any clear inputs. It's easy to spot these when the acceptance criterion only has
a wireframe or a report screenshot, with an assumption to 'test it is like
this'. That is not a useful criterion unless we know under which conditions. And
before someone says 'always', look at some input fields on the wireframe and ask
questions. What happens if the content is too long? What if it starts scrolling?
What if there are more than two pictures? Assumptions about something always
happening are frequently wrong.

One of the best ways of untangling messy scenarios is to separate inputs and
outputs.

##Key benefits

An acceptance criterion where inputs and outputs are clearly separated is much
easier to understand than scenarios of interleaved information without context.
If the specification of acceptance is easier to understand, it is easier to
check for completeness, easier to implement and easier to verify. 

A clear structure is also a better starting point for both test automation and
exploratory testing. Well-structured examples make it easier to see where to put
in automation hooks. Clearly separated inputs also make it easy to think about
experiments with those values, and identify any boundary conditions that have
not been covered.  Once the inputs are identified, experimenting with inputs can
help to uncover those fake assumptions about something always happening.

##How to make it work

For information captured in tables, it's good to pull inputs to the left and
keep outputs on the right. Most people find this intuitive.
It's then easy to see if all examples have some common input values, and make
tables even smaller by pulling such common values into a background or a set-up
section.

For information captured in sentences or bullet points, put inputs at the top
and outputs at the bottom.  If you're using one of the tools where examples are
described as given-when-then, this translates to putting the 'given' statements
at the top, and 'then' statements at the bottom of your scenarios.  Ideally,
have only one 'when' statement -- that's the action under test. 

If you have a messy scenario, don't spend a lot of time cleaning it up. If it's
proving to be difficult to separate inputs and outputs, that's a huge warning
sign that the team doesn't understand the story completely. Instead of wasting
time on cleaning it up, organise another discussion about the story and write
some better examples.
