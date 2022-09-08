'use strict';

/**
 *  search controller
 */
const { createCoreController } = require("@strapi/strapi").factories;
module.exports = createCoreController("api::search.search", ({ strapi }) => ({
    async find(ctx) {
        let collectionsOfData = [];
        const data = await strapi.db.query('api::search.search').findMany();
        const { searchQuery } = ctx?.request?.query;
        for (const controller of data) {
            const entity = await strapi.controller(controller.controllerName).find({ params: {} });
            let includesQuery = false;
            const entityDataText = this.removeKeysFromObjects(entity?.data?.attributes || {});
            includesQuery = JSON.stringify(entityDataText).toLowerCase().includes(searchQuery.toLowerCase());
            if (includesQuery) {
                const pageSeoResponse = entity?.data?.attributes?.page;
                collectionsOfData.push(pageSeoResponse);
            }
        }
        return collectionsOfData;
    },

    removeKeysFromObjects(obj) {
        const line = [];
        const keys = Object.keys(obj || {})
        for (const key of keys) {
            if (typeof obj[key] === 'object') {
                line.push(...this.removeKeysFromObjects(obj[key]));
            } else {
                line.push(obj[key]);
            }
        }
        return line;
    }

}))