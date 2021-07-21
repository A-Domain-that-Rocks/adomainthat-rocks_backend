const typeDefs = `
    type Url {
        address: String
        label: String
    }

    type Affiliation {
        value: String
        label: String
        type: String
    }

    type Note {
        value: String
        label: String
        type: String
    }

    type SlimNode {
        _id: String!
        graph_name: String!
    }

    type SlimEdge {
        _from: String!
        _to: String!
        label: String
    }

    type SlimGraph {
        startNode: SlimNode!
        vertices: [SlimNode!]
        edges: [SlimEdge]
    }

    type Author {
        _id: String!
        name: String!
        orcid: String
        bibtex: String
        aux: String
        graph_name: String!
        kind: String
        other_orcid: String
        isnot: String
        url: [Url]
        other_names: [String]
        affiliation: [Affiliation]
        note: [Note]
    }

    type Publication {
        _id: String!
        title: String
        author: [String]
        year: String
        graph_name: String!
    }

    type Institution {
        _id: String!
        name: String!
        graph_name: String!
    }

    type Year {
        _id: String
        number: String
    }

    type Query {
        year: [Year]
        authors(name: String!): [Author]
        authorGraph(author_id: String!, minDepth: String = "1", maxDepth: String = "2"): SlimGraph!
    }
`

export { typeDefs }