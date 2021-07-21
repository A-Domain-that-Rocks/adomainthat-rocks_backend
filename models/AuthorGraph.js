import { GraphQLObjectType, GraphQLList } from 'graphql';
import AuthorGraphElement from './AuthorGraphElement.js'

let AuthorGraph = new GraphQLObjectType({
    name: 'AuthorGraph',
    fields: () => ({
        graph: { type: GraphQLList(AuthorGraphElement) }
    })
});

export default AuthorGraph;