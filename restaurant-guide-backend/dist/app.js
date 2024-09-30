"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, fastify_1.default)({
    logger: true,
});
// Register Helmet for security headers
app.register(helmet_1.default, {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            // Customize as needed
        },
    },
});
// Register CORS
app.register(cors_1.default, {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET'],
});
// Register Rate Limiting
app.register(rate_limit_1.default, {
    max: 100, // maximum number of requests
    timeWindow: '1 minute',
});
// Register Routes
app.register(restaurantRoutes_1.default, { prefix: '/api' });
// Register Error Handler
app.register(errorHandler_1.default);
exports.default = app;
