const express = require('express');
const cors = require('cors');
const client = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTA BÁSICA
app.get('/api/prueba', (req, res) => {
    res.send('API funcionando correctamente');
});

// de aqui en adelante son las APIS para el CRUD DE Restaurante

// Crear restaurante
app.post('/api/restaurante', async (req, res) => {
    const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await client.query(
            'INSERT INTO Restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)',
            [id_rest, nombre, ciudad, direccion, fecha_apertura]
        );
        res.status(201).json({ success: true, message: 'Restaurante creado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todos los restaurantes
app.get('/api/restaurante', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Restaurante');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar restaurante
app.put('/api/restaurante/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ciudad, direccion, fecha_apertura } = req.body;
    try {
        await client.query(
            'UPDATE Restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5',
            [nombre, ciudad, direccion, fecha_apertura, id]
        );
        res.json({ success: true, message: 'Restaurante actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar restaurante
app.delete('/api/restaurante/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Restaurante WHERE id_rest=$1', [id]);
        res.json({ success: true, message: 'Restaurante eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// de aqui en adelante son las APIS para el CRUD DE Empleado


// Crear empleado
app.post('/api/empleado', async (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    try {
        await client.query(
            'INSERT INTO Empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)',
            [id_empleado, nombre, rol, id_rest]
        );
        res.status(201).json({ success: true, message: 'Empleado creado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener todos los empleados
app.get('/api/empleado', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM Empleado');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar empleado
app.put('/api/empleado/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    try {
        await client.query(
            'UPDATE Empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4',
            [nombre, rol, id_rest, id]
        );
        res.json({ success: true, message: 'Empleado actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar empleado
app.delete('/api/empleado/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM Empleado WHERE id_empleado=$1', [id]);
        res.json({ success: true, message: 'Empleado eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(Servidor corriendo en http:localhost:${PORT});
});