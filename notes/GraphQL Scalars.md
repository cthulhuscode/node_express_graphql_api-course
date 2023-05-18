# GraphQL Scalars

GraphQL scalars are predefined scalar types in GraphQL that represent basic data types. Scalars are used to define the shape and type of individual fields in a GraphQL schema. While GraphQL supports custom scalar types, it also provides a set of built-in scalars that cover common data types.

Here are the built-in scalar types in GraphQL:

- **Int**: A signed 32-bit integer.
- **Float**: A signed double-precision floating-point value.
- **String**: A UTF-8 character sequence.
- **Boolean**: Represents a boolean value of true or false.
- **ID**: Represents a unique identifier, often serialized as a string.

These scalar types are the building blocks for defining the data types of field values in GraphQL schemas. They are used to specify the expected types of field arguments and return values.

GraphQL also allows you to define custom scalar types if the built-in scalars do not cover your specific data needs. Custom scalars are useful when dealing with specialized data types such as dates, email addresses, URLs, etc. Custom scalars provide a way to enforce validation and parsing rules for these specific types.

Overall, scalars in GraphQL allow you to define and enforce specific data types for the fields in your API, providing a clear contract for data communication between the client and server.

## **npm `graphql-scalars`**

It's a popular npm package that provides a collection of commonly used custom scalar types for GraphQL. It simplifies the process of adding custom scalar types to your GraphQL server by providing pre-defined implementations for various data types.

The graphql-scalars library offers a wide range of custom scalar types that are not available as built-in scalars in GraphQL. Some of the commonly used custom scalar types provided by graphql-scalars include:

- **Date**: Represents a date value.
- **DateTime**: Represents a date and time value.
- **Time**: Represents a time value.
- **EmailAddress**: Represents an email address value.
- **URL**: Represents a URL value.
- **JSON**: Represents a JSON object value.
- **PhoneNumber**: Represents a phone number value.
- **BigInt**: Represents an arbitrary precision integer value.
- **GUID**: Represents a globally unique identifier value.

Using the graphql-scalars library, you can easily add these custom scalar types to your GraphQL schema by importing them and including them in your type definitions.

# Custom scalar type

We can create a custom scalar type by defining it in the resolvers.

    import { RegularExpression } from "graphql-scalars";

    // the string can have a-z characters in lower/capital case
    // min length: 3, max length: 8
    const CategoryNameType = new RegularExpression(
      "CategoryNameType",
      /^[a-zA-Z-09]{3,8}/
    );

_See `./graphql/resolvers.ts`_

Then add it to the resolvers:

    export const resolvers = {
      Query: {
        // ...
      },
      Mutation: {
       // ...
      },

      // Create new types
      CategoryNameType,  // <---
    };

Finally call it inside the _`schema.graphql`_ file

    scalar CategoryNameType
