const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const ContestStatusType = require('./contest-status');
const NameType = require('./name');
const pgdb = require('../../database/pgdb');
module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString)},
        status: {type: new GraphQLNonNull(ContestStatusType)},
        names: {
            type: new GraphQLList(NameType),
            resolve: (obj, args, { pgPool }) => {
                return pgdb(pgPool).getNames(obj);
            }
        }
    }
});