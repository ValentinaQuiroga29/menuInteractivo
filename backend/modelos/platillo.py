from conexion import obtener_conexion

def obtener_platillos():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM platillo")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_platillo_por_id(id_platillo):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM platillo WHERE id_platillo = %s", (id_platillo,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_platillo(nombre, precio, descripcion, id_categoria, ruta_imagen):
    conexion = obtener_conexion()
    with conexion.cursor() as cursor:
        cursor.execute("""
            INSERT INTO platillo (nombre, precio, descripcion, id_categoria, imagen)
            VALUES (%s, %s, %s, %s, %s)
        """, (nombre, precio, descripcion, id_categoria, ruta_imagen))
    conexion.commit()
    conexion.close()

def actualizar_platillo(id_platillo, nombre, precio, descripcion, id_categoria, ruta_imagen=None):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    if ruta_imagen:
        cursor.execute(
            "UPDATE platillo SET nombre = %s, precio = %s, descripcion = %s, id_categoria = %s, imagen = %s WHERE id_platillo = %s",
            (nombre, precio, descripcion, id_categoria, ruta_imagen, id_platillo)
        )
    else:
        cursor.execute(
            "UPDATE platillo SET nombre = %s, precio = %s, descripcion = %s, id_categoria = %s WHERE id_platillo = %s",
            (nombre, precio, descripcion, id_categoria, id_platillo)
        )
    
    conexion.commit()
    conexion.close()

def eliminar_platillo(id_platillo):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM platillo WHERE id_platillo = %s", (id_platillo,))
    conexion.commit()
    conexion.close()

def obtener_platillos_por_categoria(id_categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM platillo WHERE id_categoria = %s AND estado = 'disponible'", (id_categoria,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_platillos_disponibles():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM platillo WHERE estado = 'disponible'")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def cambiar_estado_platillo(id_platillo, estado):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("UPDATE platillo SET estado = %s WHERE id_platillo = %s", (estado, id_platillo))
    conexion.commit()
    conexion.close() 