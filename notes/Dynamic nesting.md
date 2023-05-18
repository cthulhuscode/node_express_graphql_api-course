# Dynamic nesting

It's possible to modify the output of a property inside a schema type. To do so, we can use the `parent` param, which is the first parameter passed to a resolver.

We'll modify the `products` property from the `Category` type which is already created in `schema.graphql`. So we must do this in the resolvers:

    export const resolvers = {
      Query: {
        category: getCategory, // the parent param will contain what this resolver returns
      },
      Mutation: {
        // ...
      },
      // The same name as in the schema.graphql (Category)
      Category: {
        products: getProductsOfCategory, // <--- modifying its output
      },
    };

We call Category and modify the output of the `products` property.

<br>

The function `getProductsOfCategory` it's declared inside `product.resolvers.ts` file. This is what it does:

    const service = new ProductsService();

    export const getProductsOfCategory = (parent: any) => {
      const categoryId = parent.dataValues.id;
      return service.findProductsByCategory(categoryId);
    };

So basically we use the `parent` parameter, which returns the data that is already retrieved by the `category` query itself. In the parent we can find the categoryId that we'll use to make another query to the db, this time only retrieving the products from that specific category.
