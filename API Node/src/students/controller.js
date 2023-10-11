const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
      });
};

const getStudentsById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentsById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const addStudents = (req, res) => {
    const {name, email, age, dob } = req.body;
    //revisar si el email existe
    pool.query(queries.checkEmailExists, [email], (error, results) =>{
        if (results.rows.length) {
            res.send("El email ya existe");
        }

        //añadir estudiante a la BD
        pool.query(
            queries.addStudents, 
            [name, email, age, dob], 
            (error, results) =>{
              if (error) throw error;
              res.status(200).send("Estudiante creado ");
            }
        );
    });
};

const removeStudents = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentsById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("El estudiante no existe en la BD por lo que no se puede borrar");
        }

        pool.query(queries.removeStudents, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Estudiante eliminado");
        });
    });
};

const updateStudents = (req, res) =>{
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentsById, [id], (error, results) =>{
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("El estudiante no existe en la BD por lo que no se puede borrar");
        }

        pool.query(queries.updateStudents, [name, id], (erorr, results) =>{
            if (error) throw error;
            res.status(200).send("Estudiante actualizado");
        });
    });
};

module.exports = {
    getStudents,
    getStudentsById,
    addStudents,
    removeStudents,
    updateStudents,
    
};