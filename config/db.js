import dotenv from 'dotenv';

dotenv.config();

let dbConfig = {
	'url': process.env.DB_HOST,
	'database': process.env.DB_NAME,

	// Database user credentials to use
	'username': process.env.DB_USER,
	'password': process.env.DB_PASS
};

export default dbConfig;