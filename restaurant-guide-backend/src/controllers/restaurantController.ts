import { FastifyReply, FastifyRequest } from 'fastify';
import { fetchAllRestaurants, fetchRestaurantById } from '../services/googlePlaceService';
import { Restaurant, RestaurantParams } from '../types/Restaurant';

/**
 * Handler to get all restaurants.
 */
export const getAllRestaurantsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  try {
    const restaurants: Restaurant[] = await fetchAllRestaurants();
    reply.send(restaurants);
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch restaurants' });
  }
};

/**
 * Handler to get a restaurant by ID.
 */
export const getRestaurantByIdHandler = async (
  request: FastifyRequest<{ Params: RestaurantParams }>,
  reply: FastifyReply
): Promise<void> => {
  const { id } = request.params;
  try {
    const restaurant: Restaurant | null = await fetchRestaurantById(id);
    if (restaurant) {
      reply.send(restaurant);
    } else {
      reply.status(404).send({ error: 'Restaurant not found' });
    }
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({ error: 'Failed to fetch restaurant details' });
  }
};