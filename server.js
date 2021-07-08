const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");


dotenv.config();

const app = express();
app.use(cors());

// Routes
const packageRoute = require('./routes/package_route');

// Route Middleware
app.use(express.json());
app.use('/api/package', packageRoute);

app.listen(process.env.PORT, () =>
	console.log(`API up and running, listening on port ${process.env.PORT}!`)
);