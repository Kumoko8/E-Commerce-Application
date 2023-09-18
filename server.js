const express = require('express');
const routes = require('./routes');
// import sequelize connection

const sequelize = require('./config/connection'); 

// Check the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

//Create env file (done)
//Connect to database (done)
//schema (done)
//seeds (done)
//requests not showing on Insomnia()
// category routes ()
// product routes ()
// tag routes ()
// index.js ()