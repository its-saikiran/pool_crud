const { Pool } = require('pg')
require('dotenv').config({path:'../.env'})

const pool = new Pool({
   user: process.env.USER_NAME,
   database: process.env.DATABASE,
   password: process.env.PASSWORD,
   port: process.env.PG_PORT,
   host: process.env.HOST
})


pool.connect((err) => {
   if(err) throw err;
   console.log('connected!');
})

pool.query(`CREATE TABLE ${process.env.TABLE_NAME}(id BIGSERIAL NOT NULL PRIMARY KEY,name VARCHAR(30),email VARCHAR(50),password VARCHAR(30),bio VARCHAR(100))`)
.then(res => console.log(res.command))
.catch(err => console.log(err.message))


module.exports =  pool ;


