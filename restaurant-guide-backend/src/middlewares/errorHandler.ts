import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

const errorHandler = async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
  fastify.setErrorHandler(function (error, request: FastifyRequest, reply: FastifyReply) {
    fastify.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  });
};

export default errorHandler;