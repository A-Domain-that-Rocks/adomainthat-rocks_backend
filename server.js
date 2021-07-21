import express from "express";
import dotenv  from "dotenv";
import cors from "cors";

import { graphqlHTTP } from 'express-graphql';
import my_schema from './graphql/my_schema.js'

dotenv.config();

const app = express();
app.use(cors());

// Route Middleware
app.use(express.json());
app.use('/graphql', graphqlHTTP({
    schema: my_schema,
    graphiql: true
}))

app.listen(process.env.PORT, () =>
	console.log(`API up and running, listening on port ${process.env.PORT}!`)
);