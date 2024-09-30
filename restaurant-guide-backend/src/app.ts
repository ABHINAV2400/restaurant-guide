// src/app.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import dotenv from 'dotenv';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
import restaurantRoutes from './routes/restaurantRoutes';
import errorHandler from './middlewares/errorHandler';
import path from 'path';

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
  origin: process.env.CORS_ORIGIN,
  methods: ['GET'],
});


// Register Rate Limiting
app.register(rateLimit, {
  max: 100, // maximum number of requests
  timeWindow: '1 minute',
});

app.register(fastifyStatic, {
  root: path.join(__dirname, '../restaurant-guide-frontend/build', 'index.html'),
  prefix: '/', // Serve all static files from this root
});

// Register Routes
app.register(restaurantRoutes, { prefix: '/api' });

// Register Error Handler
app.register(errorHandler);

export default app;
