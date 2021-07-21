import { aql } from "arangojs";
import { db } from '../config/db.js';

const getAuthorsByName = async (name) => {
    try {
        let queryVar = aql`
            FOR auth IN author
                FILTER auth.name != null AND auth.name != "" AND CONTAINS(auth.name, ${name})
                RETURN auth
        `
        return ( await db.query(queryVar)).all();
    } catch (e) { console.error("Error:\n" + e) };
};

const getAllYears = async () => {
    try {
        let queryVar = aql`FOR y IN year RETURN y`
        return ( await db.query(queryVar)).all();
    } catch (e) { console.error("Error:\n" + e) };
};

const getAuthorGraph = async (aID, minD, maxD) => {
    try {
        let queryVar = aql`
            LET graph_data = (
                FOR vertex, edge, path IN TO_NUMBER(${minD})..TO_NUMBER(${maxD})
                OUTBOUND ${aID} GRAPH authors_affiliations_publications_schools_citations_crossref
                    RETURN { vertices: path.vertices[*], edges: path.edges[*] }
            )
            LET allVertices = FLATTEN(
                FOR el IN graph_data
                    RETURN el.vertices
            )
            LET startN = (
                FOR el IN allVertices
                    FILTER el._id == ${aID}
                    LIMIT 1
                    RETURN el
            )
            LET allEdges = FLATTEN(
                FOR el IN graph_data
                    RETURN el.edges
            )
            RETURN { startNode: startN[0],
                     vertices: allVertices,
                     edges: allEdges }
        `
        return (await (await db.query(queryVar)).all())[0]
    } catch (e) { console.error("Error:\n" + e) };
};

export { getAllYears, getAuthorsByName, getAuthorGraph }