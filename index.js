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

// de aqui en adelante son las APIS para el CRUD DE PERSONA

// Crear persona
app.post('/api/persona', async (req, res) => {
    const { nombre, apellido1, apellido2, dni } = req.body;
    try {
        await client.query(
            'INSERT INTO persona (nombre, apellido1, apellido2, dni) VALUES ($1, $2, $3, $4)',
            [nombre, apellido1, apellido2, dni]
        );
        res.status(201).json({ success: true, message: 'Persona registrada' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Obtener personas
app.get('/api/persona', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM persona');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar persona
app.put('/api/persona/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido1, apellido2, dni } = req.body;
    try {
        const result = await client.query(
            'UPDATE persona SET nombre=$1, apellido1=$2, apellido2=$3, dni=$4 WHERE id=$5',
            [nombre, apellido1, apellido2, dni, id]
        );
        res.json({ success: true, message: 'Persona actualizada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar persona
app.delete('/api/persona/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM persona WHERE id=$1', [id]);
        res.json({ success: true, message: 'Persona eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Y DE AQUI EN ADELANTE SON LAS APIS PARA EL CRUD DE LA TABLA COCHE

// Crear coche
app.post('/api/coche', async (req, res) => {
    const { matricula, marca, modelo, caballos, persona_id } = req.body;
    try {
        await client.query(
            'INSERT INTO coche (matricula, marca, modelo, caballos, persona_id) VALUES ($1, $2, $3, $4, $5)',
            [matricula, marca, modelo, caballos, persona_id]
        );
        res.status(201).json({ success: true, message: 'Coche registrado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener coches
app.get('/api/coche', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM coche');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar coche
app.put('/api/coche/:matricula', async (req, res) => {
    const { matricula } = req.params;
    const { marca, modelo, caballos, persona_id } = req.body;
    try {
        await client.query(
            'UPDATE coche SET marca=$1, modelo=$2, caballos=$3, persona_id=$4 WHERE matricula=$5',
            [marca, modelo, caballos, persona_id, matricula]
        );
        res.json({ success: true, message: 'Coche actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar coche
app.delete('/api/coche/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
        await client.query('DELETE FROM coche WHERE matricula=$1', [matricula]);
        res.json({ success: true, message: 'Coche eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});