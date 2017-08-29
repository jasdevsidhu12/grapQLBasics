// Read the query from the command line
//  const query = process.argv[2];
const nodeEnv = require('./util').nodeEnv;

// Postgress SQL
const pg = require('pg');
const pgConfig = require('../config/pg');
const pgPool = new pg.Client(pgConfig[nodeEnv].path);
pgPool.connect();

const app = require('express')();

const ncSchema = require('../schema');
const { graphql } = require('graphql'); 
const graphqlHTTP = require('express-graphql');


//Mongo DB
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];
MongoClient.connect(mConfig.url, (err,mPool) => {
    assert.equal(err, null);
    app.use('/graphql', graphqlHTTP({
        schema: ncSchema,
        graphiql: true,
        context: { pgPool, mPool }
    }));
    const port =  process.env.port || 9000;
    app.listen(port, () => {
        console.log(`successfully running the server on port ${port}`);
    });
});