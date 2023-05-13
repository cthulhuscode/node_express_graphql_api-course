import { IProduct } from "../interfaces";
import { ProductsService } from "../services";

const service = new ProductsService();

export const getProduct = (_: any, { id }: { id: string }) => {
  return service.findOne(+id);
};

export const getProducts = () => {
  return service.find({});
};

export const addProduct = (_: any, { dto }: { dto: Omit<IProduct, "id"> }) => {
  return service.create(dto);
};

export const updateProduct = (
  _: any,
  { id, dto }: { id: number; dto: Partial<IProduct> }
) => {
  return service.update(id, dto);
};

export const deleteProduct = (_: any, { id }: { id: number }) => {
  return service.delete(id);
};
