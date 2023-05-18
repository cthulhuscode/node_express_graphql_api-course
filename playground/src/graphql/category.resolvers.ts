import { CategoriesService } from "../services/categories.service";
import { checkRolesGql } from "../utils/checkRolesGql";
import { checkJwtGql } from "../utils/checkJwtGql";
import { Roles } from "../utils/roles";

const service = new CategoriesService();

export const getCategory = (_: any, { id }: { id: number }) => {
  return service.findOneWithoutAssociations(id);
};

export const addCategory = async (_: any, { dto }: any, context: any) => {
  // If token is not valid will throw a boom error
  const user = await checkJwtGql(context);

  // If role not authorized will throw a boom error
  checkRolesGql(user, Roles.Admin);

  return service.create({ ...dto, image: dto.image.href });
};
