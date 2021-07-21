import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

let Publication = new GraphQLObjectType({
    name: 'Publication',
    fields: () => ({
        _id: { type: GraphQLString },
        _key: { type: GraphQLString },
        _rev: { type: GraphQLString },
        title: { type: GraphQLString },
        author: { type: GraphQLList(GraphQLString) }
    })
});

export default Publication;