# GraphQL

[GraphQL] es un lenguaje de queries que te permite definir qué datos pedirle a un API. Se trata de una tecnología que Facebook empezó a desarrollar en 2012, aunque fue anunciada en 2015. Según Facebook, proporciona una descripción completa y comprensible de los datos de su API, ofrece a los clientes la posibilidad de pedir exactamente lo que necesitan, facilita la evolución de las API con el paso del tiempo (escalabilidad) y habilita potentes herramientas para desarrolladores.

GraphQL propone una nueva forma de recuperar los datos de forma más óptima. Además lo que hace es reunir todas las solicitudes en un sólo endpoint y las trabaja desde ahí y luego genera las conexiones debidas.

Sin embargo, GraphQL no se conecta directamente a la BD sino que es un lenguaje de consultas entre el cliente y la arquitectura de datos que se haya planteado en la aplicación.

Lo más importante que hay que entender es que es un **lenguaje de consultas** para solicitar datos. Pero no se conecta a la BD sino que es una forma descriptiva de cómo se recuperán los datos de una API.

GraphQL no respeta las convenciones de API REST: GET, POST, PUT, PATCH, DELETE... En GraphQL todo es un POST y el HTTP Status Code siempre es _201 Created_.

# Types

GraphQL has a strong type system that defines the structure and shape of the data. Types represent the objects that can be queried or mutated. The main types in GraphQL are:

- **Scalar types**: These are built-in primitive types like String, Int, Float, Boolean, and ID (a unique identifier).
- **Object types**: These represent complex objects with multiple fields. Each field has its own type.
- **Enum types**: These define a specific set of allowed values.
- **Interface types**: These define a contract for objects that implement them. An interface can specify common fields and functionality shared by multiple types.
- **Union types**: These represent a type that can be one of several possible object types.
- **Input types**: These are used as arguments for mutations to specify the data to be created or updated.

## Queries

In GraphQL, queries are used to retrieve data from the server. A query describes the shape of the data you want to fetch and allows you to specify which fields you need. Queries are written in a structure similar to the shape of the desired response.

### type Query

The "Query" type is special: it lists all of the available queries that clients can execute, along with the return type for each.

## Mutations

### type Mutation

Mutations in GraphQL are used to modify data on the server. They allow you to create, update, or delete data. Mutations are similar to queries in structure but are defined with the mutation keyword. Mutations can have input arguments to specify the data to be modified.

### Inputs

Inputs are a way to pass complex sets of parameters to a GraphQL operation, such as a query or mutation. Inputs are defined as a separate input object type in the GraphQL schema and can be used as arguments in field definitions.

Here's an example of how inputs are defined in GraphQL:

    input CreateUserInput {
      name: String!
      age: Int!
      email: String!
    }

    type Mutation {
      createUser(input: CreateUserInput!): User!
    }

## Subscription

### type Subscription

Subscriptions in GraphQL enable real-time data communication between the server and clients. Subscriptions allow clients to subscribe to specific events or data changes and receive updates when those events occur. Subscriptions are defined similarly to queries and mutations but are prefixed with the subscription keyword.

## Resolvers

Apollo Server needs to know how to populate data for every field in your schema so that it can respond to requests for that data. To accomplish this, it uses **resolvers**.

A **resolver** is a function that's responsible for populating the data for a single field in your schema. It can populate that data in any way you define, such as by fetching data from a back-end database or a third-party API.

If you don't define a resolver for a particular field, Apollo Server automatically defines a default resolver for it.

    type Query {
      numberSix: Int! # Should always return the number 6 when queried
    }

    const resolvers = {
      Query: {
        numberSix() {
          return 6;
        },
      },
    };

Resolvers are functions or methods responsible for retrieving the requested data in a GraphQL server. They act as the bridge between the GraphQL schema and the actual data sources (such as databases or external APIs).

In a GraphQL schema, each field corresponds to a resolver function that determines how to fetch the data for that field. Resolvers are defined for each field of an object type and specify the logic to resolve the value for that field.

Resolvers can be implemented in various ways, depending on the server framework or library you're using. However, the common concept remains the same: resolving the data for a particular field.
