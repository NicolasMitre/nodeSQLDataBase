const db = require("../config/config_mysql");

/* Consultas a la base de datos por medio de GET */

//Por defecto, ver todas las filas
const viewAll = (req, res) => {
  db.query("SELECT * FROM tasks_table", (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

//Al pasarle un id a la url obtenemos una sola de nuestras filas
const viewById = (req, res) => {
  let sql = "SELECT * FROM tasks_table WHERE id=?;";
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

const viewByFilter = (req, res) => {
  console.log(req.query);
  let filtros = `isDone = '${req.query.isDone}'`;
  let sql = "SELECT * FROM tasks_table WHERE " + filtros + ";";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

/* Consultas a la base de datos por medio de un POST */

//Agregar una nueva fila por medio del body-parser
const addNewData = (req, res) => {
  const { title, description, isDone } = req.body;
  let sql =
    "INSERT INTO tasks_table (title, description, isDone) VALUES (?, ?, ?)";
  db.query(sql, [title, description, isDone], (err, data) => {
    if (err) throw err;
    res.json(data);
  });
};

/* Consultas para eliminar CUIDADO */

// esta consulta elimina una fila mediante el id que se le pasa por la url
const deleteById = (req, res) => {
  let sql = "DELETE FROM tasks_table WHERE id=?;";

  db.query(sql, [req.params.id], (error, results) => {
    if (error) return console.error(error.message);
    res.json(results.affectedRows);
  });
};

/* Consultas para actualizar la base de datos */

// esta consulta actualiza valores mediante el body parser del postman
const upgrade = (req, res) => {
  const { id, title, description, isDone } = req.body;
  let sql =
    "UPDATE tasks_table SET title = ?, description = ?, isDone = ? WHERE id = ?;";
  db.query(sql, [title, description, isDone, id], function(err, result) {
    if (err) throw err;
    res.json(result.affectedRows);
  });
};

module.exports = {
  viewAll,
  viewById,
  viewByFilter,
  addNewData,
  deleteById,
  upgrade
};
