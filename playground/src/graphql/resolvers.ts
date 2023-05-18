import { RegularExpression } from "graphql-scalars";
import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsOfCategory,
} from "./product.resolvers";
import { login } from "./auth.resolvers";
import { addCategory, getCategory } from "./category.resolvers";

// the string can have a-z characters in lower/capital case
// min length: 3, max length: 8
const CategoryNameType = new RegularExpression(
  "CategoryNameType",
  /^[a-zA-Z-09]{3,8}/
);

export const resolvers = {
  Query: {
    hello: () => "Hi world",
    getPerson: (_: any, args: { name: string; age: number }) =>
      `My name is ${args.name} and my age is ${args.age}`,

    // Products
    product: getProduct,
    products: getProducts,

    // Categories
    category: getCategory,
  },
  Mutation: {
    // Products
    addProduct,
    updateProduct,
    deleteProduct,

    // Auth
    login,

    // Categories
    addCategory,
  },
  CategoryNameType, // New custom type

  // The same name as in the schema.graphql (Category)
  Category: {
    products: getProductsOfCategory, // Modify the property products, execute it as a resolver
  },
};
