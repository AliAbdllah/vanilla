'use strict';

/**
 * email-recipient service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::email-recipient.email-recipient');
