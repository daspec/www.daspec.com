> This is a chapter from the book [Fifty Quick Ideas To Improve Your Tests](http://fiftyquickideas.com/fifty-quick-ideas-to-improve-your-tests/), used with permission by the authors.
> The content is copyrighted by Neuri Consulting LLP. 

#Explain the purpose of a test in the introduction

![](images/explain_purpose.jpg)

Lack of context is one of the root causes of major maintenance problems with
large test suites. A machine can execute a test without knowing why it needs to
do it, and push around bits of data provided by the test specification, but the
absence of a good context makes it impossible for humans to change test data in
the future. This problem is not really visible when someone writes a test,
because they have enough context in their heads to evaluate and understand the
bits and pieces passed in and out by the test. However, a few months later,
that understanding will be gone.

Because contextual information is not really needed at the time when a test is
written, tests rarely have any good introductory information. Even when the
automation tool requires some header text, people often do not give this enough
thought. They often specify the context too broadly, talking about entire
subsystems or components. Contextual descriptions are often forced into a
standardised template, frequently in the form of a user story, but this is too
broad and often incomplete or misleading. One of the teams we worked with
recently had all their Cucumber specifications written so that they started 'As
an admin, because I want to manage the system, I want ... feature'. The first
two parts of that sentence are generic and appeared in all the tests, making
them utterly irrelevant for understanding any particular test. The third part
just named the technical feature that the test was related to, which could be
inferred from the file name as well. Something was written as a context in each
file, but it was a complete waste of time. Even worse, it was a wasted
opportunity to make the tests understandable in the future.

Another common misuse of context in tests is to explain the mechanics of test
execution. In the case of automated tests, this is pretty much a waste of time.
The correct definition of how a test is executed is in the automation layer,
and any textual descriptions are likely to get out of date as the system
evolves. 

As a result of all this, an explanation of the purpose of a test is rarely
available to anyone who was not present at the time the test was written. The
more time passes, the bigger the ensuing problems.

Instead of jumping over the context too quickly, try explaining why you've
chosen a particular set of examples, and why this particular test is actually
important. Answer the question 'why?' in the context, and let the rest of the
test deal with 'what' and 'how'.

##Key benefits

Good context is crucial to avoid information bottlenecks in the future. Without
context, only the person who actually wrote a test will know what needs to
change in response to system changes, and that person might not even be around
over longer time periods. Contextual information explaining why something was
written in the first place enables anyone to evaluate at a later date whether a
test is still needed, to identify the right people to speak to if some values
need to change, and to spot potential functional gaps and inconsistencies as
they extend the system. Unless all your colleagues have perfect memory, all
this information is helpful even to the person who wrote a particular test.

Contextual information explaining the purpose of a test and why certain
examples were chosen enables teams to discuss the tests more effectively with
external stakeholders. Such people rarely participate in writing tests, and
without a purpose-oriented context they will not be able to provide good
feedback on completeness. 

##How to make it work

A quick way of discovering what needs to be explained in the context is to show
a test to someone new, and try to explain it. That person shouldn't be someone
completely outside the domain -- don't show it to a random passer-by on your
street, because that's not the target audience for your test. A good test
subject is someone who works for the same company as you but not in your team.
That person should have a reasonable amount of domain expertise and broadly
know what you're talking about, but they would not have participated in the
process of designing the test. This is a relevant simulation for a new
colleague, or someone else from your team reading the test six months in the
future. Pay attention to how you're explaining the test, and consider that
pretty much anything you say should go into the context. This ensures that the
document can be understood without you. Otherwise, you will have to repeat the
same process over and over again with different people in the future.

An alternative approach is to show the test to someone and keep quiet, letting
the reader ask questions. The answers to their questions are a good starting
point for the context.

Avoid repeating the data or the information already provided by the body of the
test. Instead, explain why you've chosen those particular examples, or that
particular way of specifying the test.

Also avoid one-sentence templates. Those are too generic to be useful. In
particular, avoid trying to force descriptions into the format of a user story.
This almost never works well, because tests shouldn't really be structured
around work task hierarchies (see the section [_Avoid organising tests by work
items_](http://fiftyquickideas.com/fifty-quick-ideas-to-improve-your-tests/) for more information).
