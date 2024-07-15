// Importar el servicio sqliteService
import sqliteService from './sqlite';

// Crear cliente
export async function insertarCliente(cliente) {
    try {
        // Abrir la conexión a la base de datos
        await sqliteService.openConnection();
        
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();
        
        // Preparar la consulta de inserción
        const insertQuery = `
            INSERT INTO cliente (nombre, telefono, cedula, direccion, comentario,  deuda_general)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        
        // Valores a insertar
        const values = [cliente.nombre, cliente.telefono, cliente.cedula, cliente.direccion, cliente.comentario,  0];
        
        // Ejecutar la consulta de inserción
        const result = await db.run(insertQuery, values);
        
        // Retornar el resultado de la inserción
        return result;
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        throw new Error('Error al insertar cliente',error);
    } finally {
        // Cerrar la conexión a la base de datos al finalizar
        await sqliteService.closeConnection();
    }
}
// Obtener clientes
export async function obtenerClientes() {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();
        
        const query = `
            SELECT * FROM cliente ORDER BY id DESC;
        `;
        const result = await db.query(query);
        console.log(result.values[0])
        
        return result.values;

    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw new Error('Error al obtener clientes');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Eliminar cliente por ID
export async function eliminarCliente(id) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            DELETE FROM cliente WHERE id = ?;
        `;
        await db.query(query, [id]);
        
        console.log('Cliente eliminado correctamente:', id);
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw new Error('Error al eliminar cliente');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Editar cliente
export async function editarCliente(cliente) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            UPDATE cliente
            SET nombre = ?, telefono = ?, cedula = ?, direccion = ?, comentario = ? 
            WHERE id = ?;
        `;
        const values = [cliente.nombre, cliente.telefono, cliente.cedula, cliente.direccion, cliente.comentario, cliente.id];
        await db.run(query, values);

        console.log('Cliente editado:', cliente.id);
    } catch (error) {
        console.error('Error al editar cliente:', error);
        throw new Error('Error al editar cliente');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Buscar cliente por nombre
export async function buscarClienteNombre(nombre) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            SELECT * FROM cliente
            WHERE nombre LIKE ?
            ORDER BY id DESC;
        `;
        const searchName = `%${nombre}%`;  
        const result = await db.query(query, [searchName]);

        return result.values; 
    } catch (error) {
        console.error('Error al buscar cliente por nombre:', error);
        throw new Error('Error al buscar cliente por nombre');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Buscar cliente por ID
export async function buscarClienteID(id) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            SELECT * FROM cliente
            WHERE id = ?;
        `;  
        const result = await db.query(query, [id]);

        return result.values; 
    } catch (error) {
        console.error('Error al buscar cliente por ID:', error);
        throw new Error('Error al buscar cliente por ID');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Obtener clientes con recordatorio de cobro activo y deuda general
export async function clientesRecordatorioCobro() {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            SELECT * FROM cliente
            WHERE recordatorio = 'recordatorio activo' AND deuda_general > 0
            ORDER BY id DESC;
        `;
        const result = await db.query(query);

        return result.values; 
    } catch (error) {
        console.error('Error al obtener clientes con recordatorio de cobro:', error);
        throw new Error('Error al obtener clientes con recordatorio de cobro');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Eliminar recordatorio de cobro de un cliente
export async function eliminarRecordatorioCobro(cliente) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            UPDATE cliente
            SET recordatorio = ?
            WHERE id = ?;
        `;
        await db.query(query, [cliente.recordatorio, cliente.id]);

        console.log('Recordatorio de cobro del cliente editado:', cliente.id);
    } catch (error) {
        console.error('Error al editar el recordatorio de cobro del cliente:', error);
        throw new Error('Error al editar el recordatorio de cobro del cliente');
    }finally{
        await sqliteService.closeConnection();
    }
}

export async function actualizarTelefono(cliente) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            UPDATE cliente
            SET telefono = ?
            WHERE id = ?;
        `;
        await db.query(query, [cliente.telefono, cliente.id]);

        console.log('Recordatorio de cobro del cliente editado:', cliente.id);
    } catch (error) {
        console.error('Error al editar el recordatorio de cobro del cliente:', error);
        throw new Error('Error al editar el recordatorio de cobro del cliente');
    }finally{
        await sqliteService.closeConnection();
    }
}