# Resolvers can handle promises

When a resolver function in GraphQL returns a promise, GraphQL itself handles that promise internally. It knows to wait for the promise to resolve before proceeding with the execution of the query.

Here's a simplified explanation of how GraphQL handles promises internally:

1. When a field is resolved, the corresponding resolver function is invoked.
2. If the resolver function returns a promise, GraphQL "awaits" that promise.
3. While the promise is pending, GraphQL halts the execution of the current resolver and moves on to resolving other fields that don't depend on the pending promise.
4. Once the promise resolves, GraphQL extracts the resolved value from the promise.
5. If the resolved value is a scalar or a non-promise value, GraphQL uses that value to fulfill the corresponding field in the query response.
6. If the resolved value is another promise, GraphQL repeats the process and waits for that promise to resolve, eventually obtaining the final resolved value.

This internal handling of promises by GraphQL allows for efficient execution of resolver functions that involve asynchronous operations. GraphQL takes care of coordinating the resolution of promises and assembling the response data in a consistent manner.

By returning promises from your resolvers, you allow GraphQL to manage the asynchronous operations and ensure that the data is resolved correctly before sending the response back to the client.

Keep in mind that this behavior is specific to GraphQL implementations. The underlying GraphQL libraries or frameworks handle promises in a standardized way to provide this functionality. It's part of the GraphQL specification and is commonly supported by GraphQL servers and client libraries.

So instead of using _async await_, like in this example:

    export const getProduct = async (_: any, { id }: { id: string }) => {
      const product = await service.findOne(+id);
      return product;
    };

We could stop using in it, and have this code:

    export const getProduct = (_: any, { id }: { id: string }) => {
      return service.findOne(+id);
    };
