"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantByIdHandler = exports.getAllRestaurantsHandler = void 0;
const googlePlaceService_1 = require("../services/googlePlaceService");
/**
 * Handler to get all restaurants.
 */
const getAllRestaurantsHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield (0, googlePlaceService_1.fetchAllRestaurants)();
        reply.send(restaurants);
    }
    catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: 'Failed to fetch restaurants' });
    }
});
exports.getAllRestaurantsHandler = getAllRestaurantsHandler;
/**
 * Handler to get a restaurant by ID.
 */
const getRestaurantByIdHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const restaurant = yield (0, googlePlaceService_1.fetchRestaurantById)(id);
        if (restaurant) {
            reply.send(restaurant);
        }
        else {
            reply.status(404).send({ error: 'Restaurant not found' });
        }
    }
    catch (error) {
        request.log.error(error);
        reply.status(500).send({ error: 'Failed to fetch restaurant details' });
    }
});
exports.getRestaurantByIdHandler = getRestaurantByIdHandler;
