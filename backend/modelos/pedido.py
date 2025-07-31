from conexion import obtener_conexion

def obtener_pedidos():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido ORDER BY fecha_hora DESC")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedido_por_id(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE id_pedido = %s", (id_pedido,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_pedido(id_cliente, id_mesero, estado='pendiente'):
    print("Valores a insertar en pedido:", id_cliente, id_mesero, estado)
    print("Insertando pedido con:", id_cliente, id_mesero, estado)
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO pedido (id_cliente, id_mesero, estado) VALUES (%s, %s, %s)",
        (id_cliente, id_mesero, estado)
    )
    conexion.commit()
    id_pedido = cursor.lastrowid
    conexion.close()
    return id_pedido

def actualizar_pedido(id_pedido, estado):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE pedido SET estado = %s WHERE id_pedido = %s",
        (estado, id_pedido)
    )
    conexion.commit()
    conexion.close()

def eliminar_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM pedido WHERE id_pedido = %s", (id_pedido,))
    conexion.commit()
    conexion.close()

def obtener_pedidos_por_cliente(id_cliente):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE id_cliente = %s ORDER BY fecha_hora DESC", (id_cliente,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedidos_por_mesero(id_mesero):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE id_mesero = %s ORDER BY fecha_hora DESC", (id_mesero,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedidos_por_estado(estado):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE estado = %s ORDER BY fecha_hora DESC", (estado,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedidos_pendientes():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE estado = 'pendiente' ORDER BY fecha_hora ASC")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedidos_en_preparacion():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE estado = 'en preparación' ORDER BY fecha_hora ASC")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def actualizar_pedido_mesero(id_pedido, estado, id_mesero):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE pedido SET estado = %s, id_mesero = %s WHERE id_pedido = %s",
        (estado, id_mesero, id_pedido)
    )
    conexion.commit()
    conexion.close()

