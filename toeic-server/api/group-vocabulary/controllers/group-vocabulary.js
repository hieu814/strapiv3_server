'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {


async find2(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.group-vocabulary.search(ctx.query);
    } else {
      entities = await strapi.services.group-vocabulary.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.group-vocabulary }));
  },
};
