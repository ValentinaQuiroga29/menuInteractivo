from conexion import obtener_conexion

def obtener_notificaciones():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación ORDER BY fecha_hora DESC")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_notificacion_por_id(id_notificacion):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación WHERE id_notificacion = %s", (id_notificacion,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_notificacion(mensaje, id_pedido, id_usuario, estado='no leído'):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO notificación (mensaje, id_pedido, id_usuario, estado) VALUES (%s, %s, %s, %s)",
        (mensaje, id_pedido, id_usuario, estado)
    )
    conexion.commit()
    id_notificacion = cursor.lastrowid
    conexion.close()
    return id_notificacion

def actualizar_notificacion(id_notificacion, mensaje=None, estado=None):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    if mensaje and estado:
        cursor.execute(
            "UPDATE notificación SET mensaje = %s, estado = %s WHERE id_notificacion = %s",
            (mensaje, estado, id_notificacion)
        )
    elif mensaje:
        cursor.execute(
            "UPDATE notificación SET mensaje = %s WHERE id_notificacion = %s",
            (mensaje, id_notificacion)
        )
    elif estado:
        cursor.execute(
            "UPDATE notificación SET estado = %s WHERE id_notificacion = %s",
            (estado, id_notificacion)
        )
    
    conexion.commit()
    conexion.close()

def eliminar_notificacion(id_notificacion):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM notificación WHERE id_notificacion = %s", (id_notificacion,))
    conexion.commit()
    conexion.close()

def obtener_notificaciones_por_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación WHERE id_usuario = %s ORDER BY fecha_hora DESC", (id_usuario,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_notificaciones_por_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación WHERE id_pedido = %s ORDER BY fecha_hora DESC", (id_pedido,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_notificaciones_no_leidas():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación WHERE estado = 'no leído' ORDER BY fecha_hora DESC")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_notificaciones_no_leidas_por_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM notificación WHERE id_usuario = %s AND estado = 'no leído' ORDER BY fecha_hora DESC", (id_usuario,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def marcar_como_leida(id_notificacion):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("UPDATE notificación SET estado = 'leído' WHERE id_notificacion = %s", (id_notificacion,))
    conexion.commit()
    conexion.close()

def marcar_todas_como_leidas_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("UPDATE notificación SET estado = 'leído' WHERE id_usuario = %s AND estado = 'no leído'", (id_usuario,))
    conexion.commit()
    conexion.close()

def contar_notificaciones_no_leidas_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT COUNT(*) FROM notificación WHERE id_usuario = %s AND estado = 'no leído'", (id_usuario,))
    resultado = cursor.fetchone()[0]
    conexion.close()
    return resultado

def obtener_notificaciones_con_detalles():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT n.*, u.nombre as nombre_usuario, p.estado as estado_pedido
        FROM notificación n
        JOIN usuario u ON n.id_usuario = u.id_usuario
        JOIN pedido p ON n.id_pedido = p.id_pedido
        ORDER BY n.fecha_hora DESC
    """)
    resultado = cursor.fetchall()
    conexion.close()
    return resultado 