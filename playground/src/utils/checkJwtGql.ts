import boom from "@hapi/boom";

export async function checkJwtGql(context: any) {
  const { user } = await context.authenticate("jwt", { session: false });

  if (!user) {
    throw boom.unauthorized("JWT token not valid.");
  }

  return user;
}
