import { GraphQLObjectType, GraphQLString } from 'graphql';

let Year = new GraphQLObjectType({
    name: 'Year',
    fields: () => ({
        _id: { type: GraphQLString },
        _key: { type: GraphQLString },
        _rev: { type: GraphQLString },
        number: { type: GraphQLString },
        graph_name: { type: GraphQLString }
    })
});

export default Year;