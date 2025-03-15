require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const productsRoute = require('./routers/productsRoute');

// Middleware and routes
app.use(express.json());
app.use('/products', productsRoute);

const PORT = process.env.APP_PORT ;

// Cors
var corsOptions = {
    origin: [
      'http://localhost:3001',
      'http://localhost:3000',
      'http://localhost:3002',
      'http://localhost:5000',
    ],
    optionsSuccessStatus: 200 // For legacy browser support
  }
  app.use(cors(corsOptions))

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.log(err));