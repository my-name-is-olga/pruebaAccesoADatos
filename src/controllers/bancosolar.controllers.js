const { pool } = require("../db");

//función para crear usuario
const crearUsuario = async (req, res) => {
  try {
    const { nombre, balance } = req.body;
    const values = [nombre, balance];
    let queryUsuario =
      "insert into usuarios (nombre, balance) values ($1, $2) returning *";
    const result = await pool.query(queryUsuario, values);
    res.send(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error buscando los productos");
  }
};

//función para obtener los usuarios registrados
const consultarUsuarios = async (req, res) => {
  try {
    const result = await pool.query("select * from usuarios");
    res.send(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error al encontrar los registros");
  }
};

//función para modificar info de los usuarios
const editarUsuario = async (req, res) => {
  try {
    const { nombre, balance, id } = req.body;
    const values = [nombre, balance, id];
    const queryEditarUsario =
      "update usuarios set nombre = $1, balance = $2 where id = $3 returning *";
    const result = await pool.query(queryEditarUsario, values);
    res.send(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error al modificar el registro");
  }
};

//función para eliminar usuarios
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.query;
    const values = [id];
    const queryEliminar = "delete from usuarios where id = $1 returning *";
    const result = await pool.query(queryEliminar, values);
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error al eliminar registro");
  }
};

//función para transferir montos entre usuarios
const transferencia = async (req, res) => {
  try {
    await pool.query("BEGIN");

    const { emisor, receptor, monto } = req.body;
    const values = [emisor, receptor, monto];

    const descontar = "update usuarios set balance = balance - $3 where id= $1";
    await pool.query(descontar, [emisor, monto]);

    const acreditar = "update usuarios set balance = balance + $3 where id= $1";
    await pool.query(acreditar, [receptor, monto]);

    const transferir =
      "insert into transferencias (emisor, receptor, monto, fecha) values ($1, $2, $3, $4)";
    await pool.query(transferir, values);

    await pool.query("COMMIT");
    console.log("Transferencia exitosa");

    res.status(200).json({ message: "Transferencia realizada con éxito" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error.message);
    res.status(400).send("Transferencia no realizada");
  }
};

//función para botener las transferencias
const transferencias = async (req, res)=>{
  try {
    const result = await pool.query("select * from transferencias");
    res.semd(result.rows); 
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Error al encontrar los registros");
  }
};

module.exports = {
  crearUsuario,
  consultarUsuarios,
  editarUsuario,
  eliminarUsuario,
  transferencia,
  transferencias
};
