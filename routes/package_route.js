const router = require('express').Router();
const packageService = require('../services/package_service');
const util = require('util');
const { createError } = require('../utils/error');

router.get("/", async (req, res) => {
	try {
		console.log("Request: " + JSON.stringify(req.query));
		let info = {
			page: req.query.page ? parseInt(req.query.page) : 1,
			results: req.query.results ? parseInt(req.query.results) : 10
		};

    	let filters = getQueryParams(req.query, ['name']);
		
		const result = await packageService.queryList(
			info.page,
			info.results,
			req.query.sortField,
			req.query.sortOrder,
			filters
		);

		info.count = result.count;
		info.fullCount = result.extra.stats.fullCount;
		
		console.log("Result: " + JSON.stringify(
			result
			// , censor(result)
		));
		return res.status(200).json({info, result: result._result});
	} catch (e) {
		console.error("Error: ", e);
		return res.status(400).json(e);
	}
});

// function censor(censor) {
// 	var i = 0;

// 	return function(key, value) {
// 		if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
// 			return '[Circular]'; 
// 		if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
// 			return '[Unknown]';
// 		++i; // so we know we aren't using the original object anymore
// 		return value;
// 	}
// }

function getQueryParams(query, names) {
	var filters = [];
	for (let i = 0; i < names.length; i++) {
		const name = names[i];
		const values = query[name];
		if (values) {
			for (let j = 0; j < values.length; j++) {
				filters.push({name: name, value: values[j]});
			}
		}
	}
	return filters;
}

module.exports = router;