import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./product.resolvers";
import { login } from "./auth.resolvers";

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
  },
};
