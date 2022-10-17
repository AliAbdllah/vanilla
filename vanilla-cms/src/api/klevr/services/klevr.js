'use strict';

/**
 * klevr service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::klevr.klevr');
