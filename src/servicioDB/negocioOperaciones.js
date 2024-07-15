import sqliteService from './sqlite';

// Registrar datos negocio
export async function registroDatosNegicio(datos_negocio) {
    try {
        // Abrir la conexión a la base de datos
        await sqliteService.openConnection();
        
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const resultDataNegocio = await db.query("SELECT * FROM negocio")

        if (resultDataNegocio.values.length > 0) {
            await db.run(`UPDATE negocio SET nombre_negocio = ?,telefono_negocio = ?, direccion_negocio = ?, recordatorio= ?,  
            WHERE nombre_negocio = ?;`, 
            [datos_negocio.nombre_negocio, datos_negocio.telefono_negocio, datos_negocio.direccion_negocio, datos_negocio.recordatorio, datos_negocio.nombre_negocio]);
        }else{
            await db.run("INSERT INTO negocio (nombre_negocio, telefono_negocio, direccion_negocio, recordatorio) VALUES (?, ?, ?, ?);",
            [datos_negocio.nombre_negocio, datos_negocio.telefono_negocio, datos_negocio.direccion_negocio, datos_negocio.recordatorio]);

        }

    } catch (error) {
        console.error('Error al registrar datos del negocio:', error);
        throw new Error('Error al registrar datos del negocio');
    }finally{
        await sqliteService.closeConnection();
    }
}


export async function obtenerDatosNegocio() {
    try {
        // Abrir la conexión a la base de datos
        await sqliteService.openConnection();
        // Obtener la conexión de la base de datos
        const db = sqliteService.getDb();

        const result = await db.query('SELECT * FROM negocio')

        return result.values;

    } catch (error) {
        console.error("error obteniendo los datos del negicio", error)
    }finally{
        await sqliteService.closeConnection();
    }
}