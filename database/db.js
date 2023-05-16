const knex = require('knex')

//Connect to the database
const database = knex({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }
})
console.log("DATABASE CONNECTED")

module.exports = database;
