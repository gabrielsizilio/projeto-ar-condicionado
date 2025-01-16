require('dotenv').config()

module.exports = {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,

    define: {
        timestamps:true,
        undescored:true
    }
}