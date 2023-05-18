import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./product.resolvers";
import { login } from "./auth.resolvers";
import { addCategory } from "./category.resolvers";
import { RegularExpression } from "graphql-scalars";

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

  // Create new types
  CategoryNameType,
};
