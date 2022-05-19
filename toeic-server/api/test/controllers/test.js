const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
  
    async create(ctx) {
        strapi.log.debug("----------create");
        console.log("asasdasas");
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.tests.create(data, { files });
      } else {
        entity = await strapi.services.tests.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.tests });
    },
    async delete(ctx) {
        const { id } = ctx.params;
         strapi.log.debug("----------create");
        console.log("asasdasas delete");
        const entity = await strapi.services.restaurant.delete({ id });
        return sanitizeEntity(entity, { model: strapi.models.tests });
      },
  };
