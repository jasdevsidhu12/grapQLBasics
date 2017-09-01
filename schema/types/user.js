const {
    GraphQLObjectType,
    GraphQl,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');
const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        contests: {
            type: new GraphQLList(ContestType),
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getContests(obj);
            }
        },
        contestsCount: {
            type: GraphQLInt,
            resolve: (obj, args, { mPool }, { fieldName }) => {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve: (obj, args, { mPool }, { fieldName }) => {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve: (obj, args, { mPool }, { fieldName }) => {
                return mdb(mPool).getCounts(obj, fieldName);
            }
        }
    }
});