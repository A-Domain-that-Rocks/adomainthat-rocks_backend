const express = require('express');
const dotenv = require('dotenv')
var cors = require('cors');

const myEnv = dotenv.config({path: "./config/.env"});
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
 
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);