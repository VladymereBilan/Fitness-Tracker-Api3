require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const serverless = require('serverless-http');

const connectDB = require('./config/db');
const swaggerDocs = require('./swagger');

// Initialize
const app = express();
const PORT = process.env.PORT || 3000;

// Swagger JSON + UI via CDN
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});

app.get('/api-docs', (req, res) => {
  // Force https in production (Vercel), keep protocol in local dev
  const host = req.get('host');
  const protocol =
    process.env.VERCEL === '1' || host.includes('vercel.app')
      ? 'https'
      : req.protocol;

  const swaggerJsonUrl = `${protocol}://${host}/swagger.json`;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Fitness Tracker API Docs</title>
      <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      <style>
        body { margin: 0; padding: 0; }
        #swagger-ui { margin: 0; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
      <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-standalone-preset.js"></script>
      <script>
        window.onload = () => {
          SwaggerUIBundle({
            url: '${swaggerJsonUrl}',
            dom_id: '#swagger-ui',
            presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
            layout: 'BaseLayout'
          });
        };
      </script>
    </body>
    </html>
  `);
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes (ONLY workout)
app.use('/api/v1/workout', require('./routes/workoutRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Fitness Tracker API!');
});

// Local-only server
if (process.env.LOCAL === "true") {
  app.listen(PORT, () => {
    console.log(`🚀 Local server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.handler = serverless(app);