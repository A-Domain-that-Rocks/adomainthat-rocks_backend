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


try {
    const cursor = await db.query(aql`
    FOR auth IN ${my_collection}
        FILTER auth.name != null
        AND auth.name != ""
        AND CONTAINS(auth.name, "Giuseppe")
    RETURN auth
    `);
    let i = 0;
    while (i < 100) {
        (function(i) {
            setTimeout(async function() {
                console.log(await cursor.next());
            }, 2000 * i)
        })(i++)
    }
    
    //const result = await cursor.all().then(docs => docs.forEach(doc => console.log(doc)));
} catch (e) {
    console.error('Query failed:\n', e)
};

const my_function = async (my_params) => {
    try {
        const cursor = await db.query(aql`
        FOR numb IN ${my_collection}
            FILTER TO_NUMBER(numb.number) > 2000
            RETURN numb
        `);
        const result = await cursor.next();
        return result
    } catch (e) {
        return console.error("File my_service.js. Inside catch. Error:\n" + e);
    }
};

//module.exports = my_function;
//export default my_function;
export default my_function;