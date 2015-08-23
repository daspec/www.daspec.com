# Supported expectation matchers

DaSpec expectations should be specified using the expect pattern:

> `expect(actualValue).`__matcher__`(expectedValue)`

The `matcher` part determines the relationship between the expected value and the actual value that will be checked. There are many pre-built matchers and you can also [extend DaSpec with your own matchers or third-party matcher libraries](custom_matcher.md).

Here is the list of pre-built matchers:

## Equality matchers

* `expect(actual).toEqual(expected)`: The argument can be a primitive value, an object or an array. Objects and arrays are compared recursively through elements and properties. [See this matcher in action](../examples/matchers/equality_matchers/)

## Range matchers

* `expect(actual).toBeGreaterThan(expected)`
* `expect(actual).toBeLessThan(expected)`
* `expect(actual).toBeGreaterThanOrEqual(expected)`
* `expect(actual).toBeLessThanOrEqual(expected)`
* `expect(actual).toBeBetween(lowerBoundary, upperBoundary)`: expects actual to fall into the range, including the boundaries
* `expect(actual).toBeWithin(lowerBoundary, upperBoundary)`: expects actual to fall into the range, excluding the boundaries

[See these matchers in action](../examples/matchers/range_matchers/)

## Boolean matchers

* `expect(expected).toBeTruthy()`: expects the value to convert to the boolean `true` value in JavaScript (See the [MDN docs on Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) for the exact definition.
* `expect(expected).toBeTrue()`: expects the value to equal the boolean `true` value in JavaScript. This will only pass if the value is a boolean already, and fail for other truthy values. 
* `expect(expected).toBeFalsy()`: expects the value to convert to the boolean `false` value in JavaScript (See the [MDN docs on Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) for the exact definition.
* `expect(expected).toBeFalse()`: expects the value to equal the boolean `false` value in JavaScript. This will only pass if the value is a boolean already, and fail for other falsy values. 

[See these matchers in action](../examples/matchers/boolean_matchers/)

## Table matchers

* `expect(actualTableOfItems).toEqualUnorderedTable(expectedTable)`: compares tables and reports matching, missing or additional items. The `actualTableOfItems` can either be a DaSpec table, an array of key-value pairs where the keys match table column header names, or a two-dimensional array. The `expectedTable` can be a DaSpec table or a two-dimensional array of items. The order of items is disregarded. If the expected table is a DaSpec table, only the properties specified in the expected table headers are compared (so the actual table can contain additional properties). If the `actualTableOfItems` does not have column titles, then the items are just compared left-to-right. [See this matcher in action](../examples/basic/tables_as_lists_of_objects/)

## List/Set matchers

* `expect(array).toEqualSet(array)`: compares two arrays disregarding the order of elements, and reports matching, missing and additional items. The expected value can be either an array or a DaSpec list. [See this matcher in action](../examples/basic/checking_for_missing_and_additional_list_items/).

## Modifiers

You can invert the meaning of a matcher by adding `not` before it. For example, the following line will check that the values are different:

    expect(actual).not.toEqual(expected)

Lastly, if you want to tell DaSpec which step parameter should be marked as right or wrong depending on the outcome of the expectation, use the `atPosition` modifier:


    expect(actual).not.toEqual(2 * expected).atPosition(3)

This is normally not required because DaSpec tries to guess the parameter automatically based on the expected value. You only need to use it if you're not comparing directly to one of the parameters, or if DaSpec can't correctly guess which one of several parameters with the same value the expectation relates to. For more information on this, see [Good automation practices](good_automation_practices.md).
