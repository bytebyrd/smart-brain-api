const knex = require('knex')

//Connect to the database
const database = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.PG_CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }, //not to be used in production
    },
})
module.exports = database;
