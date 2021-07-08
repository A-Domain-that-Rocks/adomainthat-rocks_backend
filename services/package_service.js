const dbConfig = require('../config/db');
const arangojs = require('arangojs');
const aqlQuery = arangojs.aql;
const DB = new arangojs.Database({ // Database connection
    url: dbConfig.url
});

// Database selection
DB.useDatabase(dbConfig.database);

// Specify the database user
DB.useBasicAuth(dbConfig.username, dbConfig.password);

// Collection to manage
var collection = DB.collection('packages');

exports.queryPackages = (package) => {
	let query = 'FOR doc IN @@collection';
	let params = {'@collection' : collection.name};
	if (filters.length) {
		query += " FILTER REGEX_TEST(doc.@filterName" + 1 + ", @filterValue" + 1 + ", true)";
        params['filterName'+1] = package[i].name;
        params['filterValue'+1] = package[i].value;
    }
	// query += " FILTER REGEX_TEST(doc.@filterField, @filterValue, true)";
	query += " RETURN doc";

	console.log('AQL', query);
	console.log('Params', params);

	return DB.query(query, params).catch(e => {
		return createSimpleErrorPromise(e.response.body);
	});
};