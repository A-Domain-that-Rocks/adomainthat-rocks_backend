import { GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';

let Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: { type: GraphQLString },
        _key: { type: GraphQLString },
        _rev: { type: GraphQLString },
        name: { type: GraphQLString },
        orcid: { type: GraphQLString },
        bibtex: { type: GraphQLString },
        aux: { type: GraphQLString },
        graph_name: { type: GraphQLString },
        kind: { type: GraphQLString },
        other_orcid: { type: GraphQLString },
        isnot: { type: GraphQLString },
        //url: { type: GraphQLList(GraphQLString) },
        other_names: { type: GraphQLList(GraphQLString) },
        affiliation: { type: GraphQLList(GraphQLString) },
        //note: { type: GraphQLList(GraphQLString) }
    })
});

export default Author;