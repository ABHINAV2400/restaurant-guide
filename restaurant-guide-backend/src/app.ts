// src/app.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import helmet from '@fastify/helmet';
import restaurantRoutes from './routes/restaurantRoutes';
import errorHandler from './middlewares/errorHandler';

dotenv.config();

const app = Fastify({
  logger: true,
});

// Register Helmet for security headers
app.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // Customize as needed
    },
  },
});

// Register CORS
app.register(cors, {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  methods: ['GET'],
});

// Register Rate Limiting
app.register(rateLimit, {
  max: 100, // maximum number of requests
  timeWindow: '1 minute',
});

// Register Routes
app.register(restaurantRoutes, { prefix: '/api' });

// Register Error Handler
app.register(errorHandler);

export default app;
