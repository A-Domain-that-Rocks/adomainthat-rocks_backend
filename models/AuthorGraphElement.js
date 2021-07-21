import { GraphQLObjectType, GraphQLList } from 'graphql';
import Edge from './Edge.js'
import Author from './Author.js'
import Publication from './Publication.js'
import Institution from './Institution.js'

let AuthorGraphElement = new GraphQLObjectType({
    name: 'AuthorGraphElement',
    fields: () => ({
        vertices: { type: GraphQLList( Author || Publication || Institution) },
        edges: { type: GraphQLList(Edge) }
    })
});

export default AuthorGraphElement;