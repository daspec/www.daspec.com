> This is a chapter from the book [Fifty Quick Ideas To Improve Your Tests](http://fiftyquickideas.com/fifty-quick-ideas-to-improve-your-tests/), used with permission by the authors.
> The content is copyrighted by Neuri Consulting LLP. 

#Avoid mathematical formulas 

![](images/avoid_mathematical_formulas_novo.jpg)

One typical way to waste time when specifying acceptance criteria through
examples is to use mathematical formulas to describe categories of scenarios.
This is a common beginner's mistake, and often comes from business stakeholders
or analysts who are told that they need to provide examples with stories. By
including mathematical formulas, people follow the form, but lose the
substance. Here is an example we had recently with a reporting system:

> Include all transactions in the thirty day period before the report date. 

|Transaction date                             | report? |
|---------------------------------------------|---------|
|Report date - 30 < Transaction               | exclude |
|Report date - 30 < Transaction < Report date | include |
|Transaction > Report date                    | exclude |

At first glance, this looks simple and complete. What could possibly go wrong
with it?

The key issue with such examples expressed as formulas is that they effectively
just restate the rules already specified somewhere else. The examples in the
table only repeat the same information that we already have in the header
sentence, and they do not communicate any more knowledge. We would have the
same information even without the table. The examples do not provide any better
structure for evaluating missing cases, measuring shared understanding or
spotting potential mistakes. Even worse, examples such as these provide a false
sense of completeness but can still hide quite a few questionable assumptions. 

First of all, the data types aren't clear. Are both the report date and the
transaction date only dates, or do they include time as well? Are time zones
important? What happens at the boundaries? Should we include the transactions
that took place on the report date, or exactly 30 days before the report date?
If the data types are different, for example if the transaction date is
actually a millisecond-accurate timestamp and the report date is a calendar
date, should the transaction that happened at 00:01 on 3/3/2015 be included in
the report for 3/3/2015? Or do we only include transactions that took place up
to midnight that day? Or just the ones until 23:59:59 the day before? If the
report date is a timestamp, what happens during leap hours or at daylight
saving time change boundaries?

As much as possible, avoid using mathematical formulas in scenarios. In
particular, avoid selecting equivalence classes for parameters or inputs based
on formulas. Make the scenarios more precise by listing actual values, and try
to provide representative examples for such values.

##Key benefits

Concrete examples make it much easier to discuss boundaries, compared to
examples specified using abstract mathematical formulas. A real timestamp makes
it obvious that we need to consider minutes or even milliseconds when looking
at edge cases. Adding or removing time zone information to the examples prompts
people to ask about global or local execution, and how to do comparisons in the
case of daylight time saving changes.

Real examples make it much more difficult to hide assumptions. A few concrete
dates in the table would prompt someone to ask questions about boundaries, what
happens when the transaction date and the report date are the same, and what
does it mean for them to be same. This will help teams discuss and discover
requirements before delivery.

##How to make it work

Avoid specifying input equivalence classes using intervals or formulas. Insist
on concrete examples around the relevant boundaries instead. Examples with
formulas might be a nice start for the discussion, but transform each formula
into at least two concrete boundaries as a group once the discussion starts. The
problem with formulas is mostly related to inputs. Ranges and intervals are OK
for output equivalence classes, for example with non-deterministic processes
where acceptable values can have a margin of error.

Sometimes people write formulas or intervals because it's not clear why certain
concrete values indicate important boundaries. For example, if we just used a
transaction at 29:59:59.999 on 3/3/2015 for a report executed on 3 April, the
complexity of the time-stamp value might confuse readers, and it may not be
immediately obvious why that particular value was chosen. In cases such as
this, it's perfectly fine to add a comment or a description next to the example
-- even if it's specified as an interval or a formula. But it's critical to
also include a concrete example, and use that to automate testing.

To avoid a more general related problem, evaluate examples and scenarios and
check whether they simply restate the knowledge you already have from the
contextual description or the title of the test. Do your examples make things
more concrete, or just repeat the information you already have? Unless examples
are making things more concrete, they will mislead people into a false
assumption of completeness, so they need to be restated.
