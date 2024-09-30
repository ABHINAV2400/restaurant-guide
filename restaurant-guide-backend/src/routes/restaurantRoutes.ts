import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { getAllRestaurantsHandler, getRestaurantByIdHandler } from '../controllers/restaurantController';

const restaurantRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.get('/restaurants', getAllRestaurantsHandler);
  fastify.get('/restaurants/:id', getRestaurantByIdHandler);
};

export default restaurantRoutes;