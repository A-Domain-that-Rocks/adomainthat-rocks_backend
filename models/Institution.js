import { GraphQLObjectType, GraphQLString } from 'graphql';

let Institution = new GraphQLObjectType({
    name: 'Institution',
    fields: () => ({
        _id: { type: GraphQLString },
        _key: { type: GraphQLString },
        _rev: { type: GraphQLString },
        name: { type: GraphQLString }
    })
});

export default Institution;