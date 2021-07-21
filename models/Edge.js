import { GraphQLObjectType, GraphQLString } from 'graphql';
import Author from './Author.js'
import Publication from './Publication.js'
import Institution from './Institution.js'

let Edge = new GraphQLObjectType({
    name: 'Edge',
    fields: () => ({
        _id: { type: GraphQLString },
        _key: { type: GraphQLString },
        _rev: { type: GraphQLString },
        _from: { type: Author || Publication || Institution },
        _to: { type: Author || Publication || Institution }
    })
});

export default Edge;