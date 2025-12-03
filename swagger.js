const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Tracker API',
      version: '1.0.0',
      description: 'API for tracking workouts, progress, and users.',
    },
    servers: [
      { url: 'http://localhost:3000' },
      { url: 'https://fitness-tracker-api-jamero.vercel.app' }
    ],
  },
  apis: ['./routes/*.js'], // read swagger docs from routes
};

module.exports = swaggerJsdoc(options);
