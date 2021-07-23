import { aql } from "arangojs";
import { db } from '../config/db.js';

const getNodesIDByName = async (name) => {
    try {
        let queryVar = aql`
        FOR n IN all_nodes
            FILTER n.name != null AND n.name != "" AND CONTAINS(LOWER(n.name), LOWER(${name}))
            SORT n.appearances DESC, n.name
            RETURN { _id: n.id, graph_name: n.name, the_type: n.type, appearances: ((n.appearances != null AND IS_NUMBER(n.appearances)) ? n.appearances : 1) }
        `
        return await (await db.query(queryVar)).all()
    } catch (e) { console.error("Error:\n" + e) };
};

const getNodeGraph = async (aID, minD, maxD) => {
    try {
        let queryVar = aql`
            LET graph_data = (
                FOR vertex, edge, path IN TO_NUMBER(${minD})..TO_NUMBER(${maxD})
                ANY ${aID} GRAPH author_publisher_editor_journal_publication_series_affiliation_school_cited_crossreffed
                    RETURN { vertices: path.vertices[*], edges: path.edges[*] }
            )
            LET allVertices = UNIQUE(FLATTEN(
                FOR el IN graph_data
                    RETURN el.vertices
            ))
            LET startN = (
                FOR el IN allVertices
                    FILTER el._id == ${aID}
                    LIMIT 1
                    RETURN el
            )
            LET allEdges = UNIQUE(FLATTEN(
                FOR el IN graph_data
                    RETURN el.edges
            ))
            RETURN { startNode: startN[0],
                     vertices: allVertices,
                     edges: allEdges }
        `
        return (await (await db.query(queryVar)).all())[0]
    } catch (e) { console.error("Error:\n" + e) };
};

export { getNodesIDByName, getNodeGraph }