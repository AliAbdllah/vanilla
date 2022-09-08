"use strict";

/**
 *  career-form controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { parseMultipartData } = require("strapi-utils");

module.exports = createCoreController(
  "api::career-form.career-form",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { data, files } = parseMultipartData(ctx);
        const isValidCaptcha = await strapi.config.utility.valiadteRecaptcha(
          data.recaptcha
        );
        if (!isValidCaptcha) {
          return strapi.config.utility.returnError(ctx);
        }
        const entity = await super.create(ctx);

        const newEntity = await strapi.entityService.findOne(
          "api::career-form.career-form",
          entity.data.id,
          { populate: ["CV"] }
        );
    
        const emailTo = await strapi.config.utility.getEmailRecipentByKey(
          "CAREER_EMAIL"
        );
        const baseUrl = process.env.WEBSITE_URL;
        let fileUrl = null;
        if (newEntity?.CV) {
          fileUrl = baseUrl + newEntity?.CV?.url;
        }

        if (entity) {
          try{
          // to send email internally
          await strapi.config.notification.sendEmailDynamicFromTemplate(
            "career-internal",
            emailTo,
            entity,
            true,
            fileUrl
          );

        } catch (error) {
          console.log("email error", error);
          // return strapi.config.utility.returnError(ctx);
        }
        return strapi.config.utility.returnSuccess(ctx);
        } else {
          return strapi.config.utility.returnError(ctx);
        }
      } catch (error) {
        console.log("submit career error", error);
        return strapi.config.utility.returnError(ctx);
      }
    },
  })
);
