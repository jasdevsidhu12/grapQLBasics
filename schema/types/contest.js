const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'ContestType',
    fields: {
        id: { type: GraphQLString },
        code: { type: GraphQLString }
    }
});