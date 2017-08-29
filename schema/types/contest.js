const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const ContestStatusType = require('./contest-status');
module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        createdAt: { type: new GraphQLNonNull(GraphQLString)},
        status: {type: new GraphQLNonNull(ContestStatusType)}
    }
});