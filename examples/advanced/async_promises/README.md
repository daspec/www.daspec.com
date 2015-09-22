# Asynchronous promises 

This example demonstrates how to test asynchronous execution using JavaScript [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). 

If a step definition returns a promise object, the runner will wait for the promise to resolve before proceeding. You can also attach
additional expectation matchers after the promise resolves in the `then` promise handler.
