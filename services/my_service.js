import { Database, aql } from "arangojs";
import dbConfig from '../config/db.js';

const db = new Database({
    url: dbConfig.url,
    databaseName: dbConfig.database,
    auth: {
        username: dbConfig.username,
        password: dbConfig.password
    },
});

const getAuthorByName = async (my_params) => {
    console.log("File my_service.js getAuthorByName");
    try {
        let my_query = aql`
            FOR auth IN author
                FILTER auth.name != null AND auth.name != "" AND CONTAINS(auth.name, ${my_params})
                RETURN auth
        `
        return await db.query(my_query).all()[0];
    } catch (e) { console.error("File my_service.js. Inside getAuthorByName catch. Error:\n" + e) };
};

const getAllYears = async () => {
    console.log("File my_service.js getAllYears");
    try {
        let my_query = aql`FOR y IN year RETURN y`
        return await db.query(my_query).all();
    } catch (e) { console.error("File my_service.js. Inside getAllYears catch. Error:\n" + e) };
};

const getAuthorGraph = async (aID, minD, maxD) => {
    console.log("File my_service.js getAuthorGraph");
    try {
        let my_query = aql`
            LET graph_data = (
                FOR vertex, edge, path IN TO_NUMBER(${minD})..TO_NUMBER(${maxD})
                OUTBOUND ${aID} GRAPH authors_affiliations_publications_schools_citations_crossref
                    RETURN { vertices: path.vertices[*], edges: path.edges[*] }
            )
            RETURN { graph: graph_data }
        `
        return await db.query(my_query).all();
    } catch (e) { console.error("File my_service.js. Inside getAuthorGraph catch. Error:\n" + e) };
};

export { getAllYears, getAuthorByName, getAuthorGraph }