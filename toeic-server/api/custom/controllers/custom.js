'use strict';
const _ = require('lodash');

const translateAPI = require('@vitalets/google-translate-api');
const googleDictionaryApi = require("google-dictionary-api")
const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query('user', 'users-permissions').model,
  });
  const sanitizePartType = part =>
  sanitizeEntity(part, {
    model: strapi.query('Part-Type').model,
  });

module.exports = {
  async changePassword(ctx) {
    const userFromContext = ctx.state.user;

    if (!userFromContext) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    const params = _.assign({}, ctx.request.body);
    if (
      params.currentPassword &&
      params.newPassword &&
      params.confirmNewPassword &&
      params.newPassword === params.confirmNewPassword
    ) {

      const user = await strapi.plugins['users-permissions'].services.user.fetch({
        id: userFromContext.id,
      }, ['role']);

      const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(params.currentPassword, user.password);

      if (!user) {
        return ctx.badRequest('User does not exist');
      }

      if (!validPassword) {
        return ctx.badRequest('Old password does not match.')
      }

      let updateData = { password: params.newPassword };
      const data = await strapi.plugins['users-permissions'].services.user.edit({ id: user.id }, updateData);
      return ctx.send(sanitizeUser(data));
    }

    return ctx.badRequest('New passwords do not match.');
  },
  async dictionary(ctx) {
  
    const params = _.assign({}, ctx.request.body);
    if (
      params.word
    ) {

    }
    // ctx.send(ctx.request.body);
    let entities = await googleDictionaryApi.search(params.word, 'en')
    .then(results=>{
      return results
    })
    .catch(error=>{
      return error
    })
    return ctx.send(entities);

   
  },

  async translate(ctx) {
    const { word } = ctx.params;
    if (
      word
    ) {
      let entitiesss = await translateAPI(word, {to: 'vi'}).then(res => {
        return res
      }).catch(err => {
        return err
      });
      return ctx.send(entitiesss.text);
    }

    return ctx.send("")
  },

  async getpart(ctx) {
    const { type } = ctx.params;
    const result = await strapi.query('Part').find({'part_type.type':type},);
    
    return result.map(entity => sanitizePart(entity));
  },
  
  
};