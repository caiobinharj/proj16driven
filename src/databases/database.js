const { Pool } = require('pg');

const connectionConfig = {
    connectionString: process.env.DATABASE_URL,
};

const connection = new Pool(connectionConfig);

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
    } else {
        console.log('Conexão bem-sucedida ao PostgreSQL!');
    }
});

module.exports = connection;