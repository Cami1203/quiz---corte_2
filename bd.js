const { Client } = require('pg');

// Datos de conexión con Supabase
const client = new Client({
    host: 'aws-0-sa-east-1.pooler.supabase.com', 
    port: 5432,                                  
    user: 'postgres.tdxpgpcxqhdzanzvniht',        
    password: 'k7uARMxtf0qyJ9m3',                   
    database: 'postgres',                        
    ssl: {
        rejectUnauthorized: false                
    }
});
// mensajes los cuales me arrojaran en caso de que haya un error, o, por lo contario, se hizo la conexion exitosamente
client.connect((error) => {
    if (error) {
        console.log('Error conectando con la base de datos:', error);
        return;
    } else {
        console.log('Conectado con la base de datos de Supabase');
    }
});

module.exports = client;