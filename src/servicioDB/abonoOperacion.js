import sqliteService from './sqlite';

export async function registrarAbono(datos_abono) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    await db.run("INSERT INTO abono (monto_abono, id_deuda, comentario) VALUES (?, ?, ?);", [datos_abono.monto_abono, datos_abono.id_deuda, datos_abono.comentario_abono]);

    const deuda = await db.query("SELECT * FROM deuda WHERE id_deuda = ?;", [datos_abono.id_deuda]);
    const deuda_actual = deuda.values[0];

    await db.run("UPDATE deuda SET monto_pendiente = ? WHERE id_deuda = ?;", [deuda_actual.monto_pendiente - datos_abono.monto_abono, datos_abono.id_deuda]);

    const clienteResult = await db.query("SELECT * FROM cliente WHERE id = ?;", [datos_abono.id_cliente]);
    const cliente = clienteResult.values[0];

    await db.run("UPDATE cliente SET deuda_general = ? WHERE id = ?;", [cliente.deuda_general - datos_abono.monto_abono, datos_abono.id_cliente]);

  } catch (error) {
    console.error('Error al insertar registros:', error);
    throw new Error('Error al insertar registro con transacción');
  }finally{
    await sqliteService.closeConnection();
  }
}

export async function obtenerAbonosDeuda(id) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    const deudas = await db.query("SELECT * FROM abono WHERE id_deuda = ?", [id]);
    return deudas.values;
  } catch (error) {
    console.error('Error al obtener las deudas:', error);
    throw new Error('Error al obtener las deudas');
  }finally{
    await sqliteService.closeConnection();
  }
}

export async function editarAbono(datos_abono) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    const query = `
      UPDATE abono
      SET fecha_registro = ?, monto_abono = ?, comentario = ?
      WHERE id_abono = ?;
    `;
    await db.run(query, [datos_abono.fecha, datos_abono.monto, datos_abono.comentario, datos_abono.id_abono]);

    const diferencia = datos_abono.monto - datos_abono.monto_original;
    const nuevoMontoPendiente = datos_abono.MontoPendienteDeuda + diferencia;
    await db.run("UPDATE deuda SET monto_pendiente = ? WHERE id_deuda = ?;", [nuevoMontoPendiente, datos_abono.id_deuda]);
  } catch (error) {
    console.error('Error al editar el abono:', error);
    throw new Error('Error al editar el abono');
  }finally{
    await sqliteService.closeConnection();
  }
}

export async function eliminarAbonos(datos_abono) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    await db.run("DELETE FROM abono WHERE id_abono = ?;", [datos_abono.id_abono]);
    await db.run("UPDATE deuda SET monto_pendiente = ? WHERE id_deuda = ?;", [datos_abono.monto_deuda + datos_abono.monto, datos_abono.id_deuda]);

  } catch (error) {
    console.error('Error al eliminar el abono:', error);
    throw new Error('Error al eliminar el abono');
  }finally{
    await sqliteService.closeConnection();
  }
}

export async function abonosDelDia() {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    const query = "SELECT * FROM abono WHERE fecha_registro LIKE ?;";
    const searchAbono = `%${obtenerFechaActual()}%`;
    const result = await db.query(query, [searchAbono]);
    return result.values;
  } catch (error) {
    console.error('Error al obtener los abonos del día:', error);
    throw new Error('Error al obtener los abonos del día');
  }finally{
    await sqliteService.closeConnection();
  }
}

function obtenerFechaActual() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
  const day = fecha.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function obtenerClienteAbono(id_deuda) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();

    const query = "SELECT id_cliente FROM deuda WHERE id_deuda = ?;";
    const result = await db.query(query, [id_deuda]);
    const idClienteAbono = result.values[0].id_cliente;

    const clienteResult = await db.query("SELECT nombre FROM cliente WHERE id = ?;", [idClienteAbono]);
    return clienteResult.values[0];
  } catch (error) {
    console.error('Error al obtener el cliente del abono:', error);
    throw new Error('Error al obtener el cliente del abono');
  }finally{
    await sqliteService.closeConnection();
  }
}

export async function obtenerAbonosPorFecha(fecha) {
  try {
    // Abrir la conexión a la base de datos
    await sqliteService.openConnection();
        
    // Obtener la conexión de la base de datos
    const db = sqliteService.getDb();
    
    const query = "SELECT * FROM abono WHERE fecha_registro LIKE ? ORDER BY id_abono DESC;";
    const result = await db.query(query, [`%${fecha}%`]);
    return result.values;
  } catch (error) {
    console.error('Error al obtener los abonos por fecha:', error);
    throw new Error('Error al obtener los abonos por fecha');
  }finally{
    await sqliteService.closeConnection();
  }
}