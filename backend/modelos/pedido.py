from conexion import obtener_conexion
from datetime import datetime

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

def insertar_pedido(id_cliente, fecha_pedido, estado, total, id_mesero=1):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO pedido (id_cliente, id_mesero, fecha_hora, estado) VALUES (%s, %s, %s, %s)",
        (id_cliente, id_mesero, fecha_pedido, estado)
    )
    conexion.commit()
    id_pedido = cursor.lastrowid
    conexion.close()
    return id_pedido

def actualizar_pedido(id_pedido, id_cliente, fecha_pedido, estado, id_mesero=1):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE pedido SET id_cliente = %s, id_mesero = %s, fecha_hora = %s, estado = %s WHERE id_pedido = %s",
        (id_cliente, id_mesero, fecha_pedido, estado, id_pedido)
    )
    conexion.commit()
    conexion.close()

def eliminar_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM pedido WHERE id_pedido = %s", (id_pedido,))
    conexion.commit()
    conexion.close()

def obtener_pedidos_por_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE id_cliente = %s ORDER BY fecha_hora DESC", (id_usuario,))
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

def cambiar_estado_pedido(id_pedido, estado):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE pedido SET estado = %s WHERE id_pedido = %s",
        (estado, id_pedido)
    )
    conexion.commit()
    conexion.close()

def calcular_total_pedido(id_pedido):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("""
        SELECT SUM(dp.cantidad * p.precio) as total
        FROM detallepedido dp
        JOIN platillo p ON dp.id_platillo = p.id_platillo
        WHERE dp.id_pedido = %s
    """, (id_pedido,))
    resultado = cursor.fetchone()
    conexion.close()
    return float(resultado[0]) if resultado and resultado[0] else 0

# Funciones adicionales para compatibilidad
def obtener_pedidos_por_cliente(id_cliente):
    return obtener_pedidos_por_usuario(id_cliente)

def obtener_pedidos_por_mesero(id_mesero):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pedido WHERE id_mesero = %s ORDER BY fecha_hora DESC", (id_mesero,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_pedidos_pendientes():
    return obtener_pedidos_por_estado('pendiente')

def obtener_pedidos_en_preparacion():
    return obtener_pedidos_por_estado('en_preparacion')

def actualizar_pedido_mesero(id_pedido, estado, id_mesero):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE pedido SET estado = %s, id_mesero = %s WHERE id_pedido = %s",
        (estado, id_mesero, id_pedido)
    )
    conexion.commit()
    conexion.close()

