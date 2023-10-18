'use strict';

/**
 * danado service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::danado.danado');
