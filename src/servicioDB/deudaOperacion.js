// Importar el servicio sqliteService
import sqliteService from './sqlite';

// Registrar nueva deuda
export async function registroDeuda(datos_deuda) {
    try {
        // Abrir la conexión a la base de datos
        await sqliteService.openConnection();
        
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        // Realizar las operaciones que desees dentro de la transacción
        await db.run("INSERT INTO deuda (monto_deuda, id_cliente, detalles_deuda, estado, monto_pendiente) VALUES (?, ?, ?, ?, ?);",
            [datos_deuda.monto, datos_deuda.cliente.id, datos_deuda.detalle_deuda, datos_deuda.estado, datos_deuda.monto]);

        // Obtener cliente por ID
        const clienteResult = await db.query("SELECT * FROM cliente WHERE id = ?;", [datos_deuda.cliente.id]);
        const cliente = clienteResult.values[0];
        // Modificar el monto de deuda general del cliente
        await db.run("UPDATE cliente SET deuda_general = ? WHERE id = ?;", [cliente.deuda_general + datos_deuda.monto, datos_deuda.cliente.id]);
    } catch (error) {
        console.error('Error al registrar nueva deuda:', error);
        throw new Error('Error al registrar nueva deuda');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Obtener todas las deudas
export async function obtenerTodasLasDeudas() {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const deudas = await db.query("SELECT * FROM deuda");
        return deudas.values;
    } catch (error) {
        console.error('Error al obtener todas las deudas:', error);
        throw new Error('Error al obtener todas las deudas');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Obtener deudas de un cliente por su ID
export async function obtenerDeudasCliente(id) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const deudas = await db.query("SELECT * FROM deuda WHERE id_cliente = ? AND monto_pendiente > 0;", [id]);
        return deudas.values;
    } catch (error) {
        console.error('Error al obtener las deudas del cliente:', error);
        throw new Error('Error al obtener las deudas del cliente');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Obtener deuda por su ID
export async function obtenerDeudasID(id) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const deudas = await db.query("SELECT * FROM deuda WHERE id_deuda = ?", [id]);
        return deudas.values;
    } catch (error) {
        console.error('Error al obtener la deuda por ID:', error);
        throw new Error('Error al obtener la deuda por ID');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Eliminar deuda por su ID
export async function eliminarDeuda(id) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            DELETE FROM deuda
            WHERE id_deuda = ?;
        `;
        await db.query(query, [id]);
    } catch (error) {
        console.error('Error al eliminar la deuda:', error);
        throw new Error('Error al eliminar la deuda');
    }finally{
        await sqliteService.closeConnection();
    }
}

// Actualizar información de una deuda
export async function actualizarDeuda(datos_deuda) {
    try {
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const query = `
            UPDATE deuda
            SET fecha_registro = ?, detalles_deuda = ?
            WHERE id_deuda = ?;
        `;
        const values = [datos_deuda.fecha_registro, datos_deuda.detalles_deuda, datos_deuda.id_deuda];
        await db.query(query, values);
    } catch (error) {
        console.error('Error al actualizar la deuda:', error);
        throw new Error('Error al actualizar la deuda');
    }finally{
        await sqliteService.closeConnection();
    } 
}