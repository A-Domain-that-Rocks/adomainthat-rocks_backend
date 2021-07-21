import { getAllYears, getAuthorsByName, getAuthorGraph } from './resolverFunctions.js';

const resolvers = {
    Query: {
        year: async () => await getAllYears(),
        authors: async (root, args) => await getAuthorsByName(args.name),
        authorGraph: async (root, args) => await getAuthorGraph(args.author_id, args.minDepth, args.maxDepth)
    }
};

export { resolvers }