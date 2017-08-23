// Import type helpers form graphql-js
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'hello world'
        },
        jasdev: {
            type: GraphQLString,
            resolve: () => 'Jasdev singh is awesome!!!!!!'
        }
    }
});
const ncSchema = new GraphQLSchema({
    query: RootQueryType,
});
module.exports = ncSchema;