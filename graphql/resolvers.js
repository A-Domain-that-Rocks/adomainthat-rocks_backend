import { getAllYears, getAuthorsByName, getNodesIDByName, getNodeGraph } from './resolverFunctions.js';

const resolvers = {
    Query: {
        year: async () => await getAllYears(),
        authors: async (root, args) => await getAuthorsByName(args.name),
        nodesID: async (root, args) => await getNodesIDByName(args.name),
        nodeGraph: async (root, args) => await getNodeGraph(args.node_id, args.minDepth, args.maxDepth)
    }
};

export { resolvers }