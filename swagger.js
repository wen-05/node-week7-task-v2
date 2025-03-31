const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Express fitness API',
    description: '線上健身平台 API'
  },
  host: 'localhost:8080',
  schema: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'authorization',
      description: '請在標頭中傳遞 Bearer Token。範例: Bearer <your-token-here>'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);