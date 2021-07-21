import { GraphQLSchema,
         GraphQLObjectType,
         GraphQLString,
         GraphQLList,
         GraphQLNonNull } from 'graphql';

import { getAllYears,
         getAuthorByName,
         getAuthorGraph } from '../services/my_service.js';
import Author from '../models/Author.js';
import AuthorGraph from '../models/AuthorGraph.js';
import Year from '../models/Year.js';

let my_schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            author: {
                args: { name: { type: new GraphQLNonNull(GraphQLString) } },
                type: Author,
                resolve: async (root, args) => { return await getAuthorByName(args.name); }
            },
            year: {
                type: new GraphQLList(Year),
                resolve: async (root) => { return await getAllYears(); }
            },
            authorGraph: {
                args: {
                    author_id: { type: new GraphQLNonNull(GraphQLString) },
                    minDepth: { type: new GraphQLNonNull(GraphQLString) },
                    maxDepth: { type: new GraphQLNonNull(GraphQLString) }
                },
                type: AuthorGraph,
                resolve: async (root, args) => { return await getAuthorGraph(args.author_id, args.minDepth, args.maxDepth); }
            }
        })
    })
});

export default my_schema;