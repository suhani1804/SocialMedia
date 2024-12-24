const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const connectDB = require('./config/db');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});
