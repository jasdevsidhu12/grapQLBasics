const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

const MeType = require('./types/me');
const pgdb = require('../database/pgdb');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        me: {
            type: MeType,
            description: 'Information about users',
            args: {
                key: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (obj, args, { pgPool }) => { 
                // obj represents the parent fields/field type
                // args represents arguements
                // ctx represents global object define in graphqlHTTP()
                // ctx.pgPool is an example
                // return {
                //     id: args.key.toString(),
                //     email: "handsomerocky@me.com"
                // };
                return pgdb(pgPool).getUsers(args.key);
            }
        }
    }
});
const ncSchema = new GraphQLSchema({
    query: RootQueryType,
});
module.exports = ncSchema;












/*
    const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'It\'s automated to return "hello world"',
            resolve: () => 'hello world'
        },
        jasdev: {
            type: GraphQLString,
            args: {
                key: {
                    type: GraphQLString
                }
            },
            description: 'It\'s automated to return "Jasdev singh is awesome!!!!!!"',
            resolve: () => 'Jasdev singh is awesome!!!!!!'
        }
    }
});
const ncSchema = new GraphQLSchema({
    query: RootQueryType,
});
 */