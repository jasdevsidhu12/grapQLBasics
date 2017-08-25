// Read the query from the command line
//  const query = process.argv[2];
const nodeEnv = require('./util').nodeEnv;
const pg = require('pg');
const pgConfig = require('../config/pg');
const pgPool = new pg.Client(pgConfig[nodeEnv].path);
pgPool.connect();

const app = require('express')();

const ncSchema = require('../schema');
const { graphql } = require('graphql'); 
const graphqlHTTP = require('express-graphql');

app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPool }
}));

const port =  process.env.port || 9000;
app.listen(port, () => {
    console.log(`successfully running the server on port ${port}`);
});