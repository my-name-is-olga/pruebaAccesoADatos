const pg = require("pg");
const {Pool} = pg;

//variables de entorno
const userDb = "postgres";
const passDb = "1234";
const hostDb = "localhost";
const portDb = "5432";
const nameDb = "bancosolar";

const pool = new Pool({
    connectionString: `postgres://${userDb}:${passDb}@${hostDb}:${portDb}/${nameDb}`,
});

module.exports = {pool};