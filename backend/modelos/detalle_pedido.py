from conexion import obtener_conexion

def obtener_detalles_pedido():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM detallepedido")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_detalle_por_id(id_detalle):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM detallepedido WHERE id_detalle = %s", (id_detalle,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_detalle_pedido(id_pedido, id_platillo, cantidad):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO detallepedido (id_pedido, id_platillo, cantidad) VALUES (%s, %s, %s)",
        (id_pedido, id_platillo, cantidad)
    )
    conexion.commit()
    id_detalle = cursor.lastrowid
    conexion.close()
    return id_detalle

def actualizar_detalle_pedido(id_detalle, cantidad):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE detallepedido SET cantidad = %s WHERE id_detalle = %s",
        (cantidad, id_detalle)
    )
    conexion.commit()
    conexion.close()

def eliminar_detalle_pedido(id_detalle):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM detallepedido WHERE id_detalle = %s", (id_detalle,))
    conexion.commit()
    conexion.close()

def obtener_detalles_por_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT dp.*, p.nombre as nombre_platillo, p.precio, p.descripción
        FROM detallepedido dp
        JOIN platillo p ON dp.id_platillo = p.id_platillo
        WHERE dp.id_pedido = %s
        ORDER BY dp.id_detalle
    """, (id_pedido,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_detalles_con_platillos():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT dp.*, p.nombre as nombre_platillo, p.precio, p.descripción,
               ped.fecha_hora, ped.estado as estado_pedido
        FROM detallepedido dp
        JOIN platillo p ON dp.id_platillo = p.id_platillo
        JOIN pedido ped ON dp.id_pedido = ped.id_pedido
        ORDER BY ped.fecha_hora DESC, dp.id_detalle
    """)
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def calcular_total_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("""
        SELECT SUM(dp.cantidad * p.precio) as total
        FROM detallepedido dp
        JOIN platillo p ON dp.id_platillo = p.id_platillo
        WHERE dp.id_pedido = %s
    """, (id_pedido,))
    resultado = cursor.fetchone()[0]
    conexion.close()
    return resultado if resultado else 0

def contar_platillos_por_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT COUNT(*) FROM detallepedido WHERE id_pedido = %s", (id_pedido,))
    resultado = cursor.fetchone()[0]
    conexion.close()
    return resultado

def verificar_platillo_en_pedido(id_pedido, id_platillo):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM detallepedido WHERE id_pedido = %s AND id_platillo = %s", (id_pedido, id_platillo))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def actualizar_cantidad_platillo_en_pedido(id_pedido, id_platillo, nueva_cantidad):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE detallepedido SET cantidad = %s WHERE id_pedido = %s AND id_platillo = %s",
        (nueva_cantidad, id_pedido, id_platillo)
    )
    conexion.commit()
    conexion.close() 