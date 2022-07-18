'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
 const { sanitizeEntity } = require('strapi-utils');
 const sanitizePart = part =>
 sanitizeEntity(part, {
   model: strapi.query('Part').model,
 });
module.exports = {

    async getpart(ctx) {
        const { type } = ctx.params;
        const result = await strapi.query('Part').find({'part_type.type':type},);
        
        return result.map(entity => sanitizePart(entity));
      },
};
