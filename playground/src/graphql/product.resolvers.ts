import { IProduct } from "../interfaces";
import { ProductsService } from "../services";

const service = new ProductsService();

export const getProduct = async (_: any, { id }: { id: string }) => {
  const product = await service.findOne(+id);
  return product;
};

export const getProducts = async () => {
  const products = await service.find({});
  return products;
};

export const addProduct = async (
  _: any,
  { dto }: { dto: Omit<IProduct, "id"> }
) => {
  const newProduct = await service.create(dto);
  return newProduct;
};
