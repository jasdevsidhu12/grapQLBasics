console.log('Executing graphql schema .......');

// Read the query from the command line
const query = process.argv[2];

//  const app = require('express')();

const ncSchema = require('../schema');
const { graphql } = require('graphql'); 
//  const graphqlHTTP = require('express-graphql');

// app.use('/graphql', graphqlHTTP({
//     schema: ncSchema,
//     graphiql: true
// }));
graphql(ncSchema, query).then((data) => {
    console.log('GQL Data');
    console.log(data);
});

// const port =  process.env.port || 3000;
// app.listen(port, () => {
//     console.log('successfully running the server');
// });