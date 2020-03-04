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
  let sql = "SELECT * FROM tasks_table WHERE id=" + req.params.id + ";";
  db.query(sql, (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
};

/* Consultas a la base de datos por medio de un POST */

//Agregar una nueva fila por medio del body-parser
const addNewData = (req, res) => {
  const data = req.body;
  let sql =
    "INSERT INTO tasks_table (title, description, isDone) VALUES ('" +
    data.title +
    "', '" +
    data.description +
    "', '" +
    data.isDone +
    "')";

  db.query(sql, err => {
    if (err) throw err;
    res.json(data);
  });
};

const deleteById = (req, res) => {
  let sql = "DELETE FROM tasks_table WHERE id=" + req.params.id + ";";

  db.query(sql, (error, results) => {
    if (error) return console.error(error.message);
    res.json(results.affectedRows);
  });
};

const upgrade = (req, res) => {
  var sql =
    "UPDATE tasks_table SET title = 'Actualizado justo ahora' WHERE id =" +
    req.params.id +
    ";";
  db.query(sql, function(err, result) {
    if (err) throw err;
    res.json(result.affectedRows);
  });
};

module.exports = {
  viewAll,
  viewById,
  addNewData,
  deleteById,
  upgrade
};
