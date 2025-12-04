import express from 'express';
import cors from 'cors';
import projectsRoutes from './routes/projects.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import {setupSwagger} from './swagger.js';

const app = express();

// Documentation Swagger
setupSwagger(app);
// Middleware
app.use(cors({
	origin: 'http://localhost:5173', 
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// routes
app.use(projectsRoutes);
app.use(analyticsRoutes);
 
export default app;