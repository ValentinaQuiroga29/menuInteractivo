from conexion import obtener_conexion

def obtener_platos():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM plato")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_plato_por_id(id_plato):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM plato WHERE id_plato = %s", (id_plato,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_plato(nombre, descripcion, precio, categoria, disponible=True):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO plato (nombre, descripcion, precio, categoria, disponible) VALUES (%s, %s, %s, %s, %s)",
        (nombre, descripcion, precio, categoria, disponible)
    )
    conexion.commit()
    conexion.close()

def actualizar_plato(id_plato, nombre, descripcion, precio, categoria, disponible):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE plato SET nombre = %s, descripcion = %s, precio = %s, categoria = %s, disponible = %s WHERE id_plato = %s",
        (nombre, descripcion, precio, categoria, disponible, id_plato)
    )
    conexion.commit()
    conexion.close()

def eliminar_plato(id_plato):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM plato WHERE id_plato = %s", (id_plato,))
    conexion.commit()
    conexion.close()

def obtener_platos_por_categoria(categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM plato WHERE categoria = %s AND disponible = 1", (categoria,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_platos_disponibles():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM plato WHERE disponible = 1")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado 