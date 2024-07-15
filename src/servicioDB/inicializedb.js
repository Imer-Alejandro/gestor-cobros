// servicioDB/inicializedb.js

export async function initializeDatabase(db) {
         //inicialized tables 

        const createQueries = [
        `
        CREATE TABLE IF NOT EXISTS abono (
            id_abono INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            monto_abono DECIMAL(12, 2),
            id_deuda INTEGER,
            comentario TEXT
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS cliente (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            telefono TEXT,
            cedula TEXT,
            direccion TEXT,
            comentario TEXT,
            deuda_general DECIMAL(12, 2),
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS negocio(
            nombre_negocio TEXT,
            telefono_negocio TEXT,
            direccion_negocio TEXT,
            description TEXT
        );
        `,
        `
        CREATE TABLE IF NOT EXISTS deuda (
            id_deuda INTEGER PRIMARY KEY AUTOINCREMENT,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            monto_deuda DECIMAL(12, 2),
            monto_pendiente DECIMAL(12, 2),
            id_cliente INTEGER,
            detalles_deuda TEXT,
            estado TEXT
        );
        `
        ]
       
        for (const query of createQueries) {
            const resCreate = await db.execute(query);
            console.log(`Create table: ${JSON.stringify(resCreate)}`);
            if (resCreate.changes && resCreate.changes.changes && resCreate.changes.changes < 0) {
                throw new Error(`Error: execute failed`);
            }
        }
}
