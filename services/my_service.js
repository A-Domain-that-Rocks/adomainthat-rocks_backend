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

var my_var = await db.collection("year").get({ number: "2000" });
console.log("File my_service.js my_var\n" + my_var);

const my_collection = db.collection("author")

//db.useBasicAuth("root", "maplesyrup");

//return db.query(query, params, {count:true, options:{fullCount:true} }).catch(e => {
//    return createSimpleErrorPromise(e.response.body);
//});

const getAuthorByName = async (my_params) => {
    console.log("File my_service.js getAuthorByName");
    try {
        let my_query = aql`
            FOR auth IN ${my_collection}
                FILTER auth.name != null
                AND auth.name != ""
                AND CONTAINS(auth.name, ${my_params})
                RETURN auth
            `

        const cursor = await db.query(my_query);
        //let i = 0;
        //while (i < 100) {
        //    (function(i) {
        //        setTimeout(async function() {
        //            console.log(await cursor.next());
        //        }, 2000 * i)
        //    })(i++)
        //}

        //const result = await cursor.all().then(docs => docs.forEach(doc => console.log(doc)));
        const result = await cursor.all();
        //console.log(result);
        return result[0]
    } catch (e) {
        console.error("File my_service.js. Inside getAuthorByName catch. Error:\n" + e)
    };
};

const my_year_collection = db.collection("year")

const getAllYears = async () => {
    console.log("File my_service.js getAllYears");
    try {
        let my_query = aql`
            FOR y IN ${my_year_collection}
                RETURN y
            `

        const cursor = await db.query(my_query);
        //let i = 0;
        //while (i < 100) {
        //    (function(i) {
        //        setTimeout(async function() {
        //            console.log(await cursor.next());
        //        }, 2000 * i)
        //    })(i++)
        //}

        //const result = await cursor.all().then(docs => docs.forEach(doc => console.log(doc)));
        const result = await cursor.all();
        //console.log(result);
        return result
    } catch (e) {
        console.error("File my_service.js. Inside getAllYears catch. Error:\n" + e)
    };
};

//module.exports = my_function;
//export default my_function;
export { getAllYears, getAuthorByName }