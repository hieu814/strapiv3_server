'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    // lifecycles: {
    //     async beforeCreate(data) {
    //         strapi.log.debug("beforeCreate");
            
    //         strapi.log.debug(data.test);
    //         throw new TypeError("exist");
    //     //   if (data.title) {
    //     //     data.slug = slugify(data.title, { lower: true });
    //     //   }
    //     //   if (data.body) {
    //     //     // function which modify the hyperLinks and return HMLT body as string
    //     //     const body = await buildFullUrl.index(data);
    //     //     data.body = body;
    //     //   }
    //     },
    //     async beforeUpdate(params, data) {
    //       if (data.title) {
    //         data.slug = slugify(data.title, { lower: true });
    //       }
    //   },
    // }
    lifecycles: {
        afterCreate(result, data) {
           strapi.emitToAllUsers('test::created', result);
        }
      }
};
