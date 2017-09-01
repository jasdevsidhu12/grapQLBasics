const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = require('graphql');

const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'Name',
    fields: () => {
        // lazy loading approach
        const UserType = require('./user');
        return {
            id: { type: GraphQLID },
            label: { type: new GraphQLNonNull(GraphQLString)},
            description: { type: GraphQLString },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            createdBy: {
                type: new GraphQLNonNull(UserType),
                resolve(obj, args, { pgPool }) {
                    return pgdb(pgPool).getUserById(obj.createdBy);
                }
            }
        };
    }
});