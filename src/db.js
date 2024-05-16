import  pg from 'pg';

// Configuración del pool de conexiones
export const pool = new pg. Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    database: 'invoice-dev',
    port: 5432,
});


