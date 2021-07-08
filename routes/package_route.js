const router = require('express').Router();
const packageService = require('../services/package_service');
const util = require('util');
const { createError } = require('../utils/error');

router.get("/", async (req, res) => {
	try {
		console.log("Request: " + JSON.stringify(req.query));

    let package = req.query["package"];

		const result = await packageService.queryPackages(package);

		console.log("Result: " + JSON.stringify(result));
		return res.status(200).json({ result: result._result });
	} catch (e) {
		console.error("Error: ", e);
		return res.status(400).json(e);
	}
});

module.exports = router;