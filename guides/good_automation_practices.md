# Good step automation practices

The automation code between the specifications and the system under test is the necessary link to make the DaSpec magic work, and for your team to get the most out of [executable specifications](executable_specifications.md). Here are some overall guidelines to keep in mind while automating step execution.

## Avoid enforcing automation patterns on people who write specifications

Many teams make a mistake of trying to optimise the number of automation steps, and once there is a single way of writing something, enforce that structure in all related specifications. DaSpec's allows people to automate the validation of natural-language text, which means that your specifications can read nicely, and be designed for humans and not for robots. By enforcing a structure of specifications around existing automation components, teams just lose that value.

Work together with a team to evolve a domain language -- names, relationships and concepts -- and allow for flexibility in the structure of sentences using those concepts. Avoid using seven different names to describe the same concept, but allow for different sentence or table structures that use your domain language consistently. That way you'll allow people to focus on the key attributes and aspects of a domain concept that are useful in a particular situation.

## Avoid treating automation code as second-class

The second biggest mistake teams make (not just with DaSpec, but with all similar tools) is to disregard good design practices when writing automation code, just because it's not shipped with the rest of production code. This is a sure way to create a maintenance headache in the future. Avoid duplication, extract reusable components, and in general apply all good code design practices that you normally use when writing step automation. This will ensure that you can add things easily in the future and change the automation when your system under test changes.

## Use the step parameters in expectations directly, if possible

DaSpec tries to mark failures as narrowly as possible, and show the actual value next to the failed expectation if it can guess where in a sentence to put it. This helps people pin-point and troubleshoot problems faster. So instead of just showing:

><del>The transaction was approved by Tom</del>

DaSpec will try to show failures such as

>The transaction was <b><del>approved</del> [rejected]</b> by Tom.

or

>The transaction was approved by <b><del>Tom</del> [Mike]</b>

In order to make this work, use the expected values from examples directly in the expectations -- so DaSpec can guess when an assertion is related to a particular step parameter. So, for example, instead of writing:

    defineStep(/ .... /, allowedValue) {

       expect(actualResult).toEqual(0.25 * allowedValue)

    };

use the `allowedRange` argument directly in the expectation, and move the computations to the `expect` part. This would allow DaSpec to display failures more narrowly:


    defineStep(/ .... /, allowedValue) {

       expect(4 * actualResult).toEqual(allowedValue)

    };

If this is not possible and you still want to let DaSpec know to mark a failure narrowly, use the `atPosition` modifier. This tells DaSpec which step argument (0-indexed) an assertion relates to. For example:


    defineStep(/ .... /, allowedValue, allowedDeviation ) {

       expect(4 * actualResult).toBeLessThan(allowedValue + allowedDeviation).atPosition(0);

    };

You can also use this modifier to override DaSpec's algorithm for guessing positions. If your step has several arguments matching the same value, DaSpec uses the right-most one. This is because people normally write about inputs first, and then describe the expected output. If you're dealing with a sentence where the expected output comes before inputs, tell DaSpec about that by using `atPosition`. 
