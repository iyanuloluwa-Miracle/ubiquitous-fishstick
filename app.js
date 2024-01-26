const express = require('express');
const {
  notFoundHandler,
  errorHandler,
} = require("./src/middlewares/errorHandler");
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api/v1', require('./src/routes/auth.route'));
app.use('/api/v1', require('./src/routes/task.route'));
// app.js or index.js
const sequelize = require('./src/models/sequelizeConfig');
//const User = require('./models/User');

// Sync all models with the database
sequelize.sync({ force: false}).then(() => {
  console.log('Tables synced successfully');
}).catch((error) => {
  console.error('Error syncing tables:', error);
});


// Middleware to generate 404 error for undefined routes
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
