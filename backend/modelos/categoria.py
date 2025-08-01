from conexion import obtener_conexion

def obtener_categorias():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM categoria ORDER BY nombre")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_categoria_por_id(id_categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM categoria WHERE id_categoria = %s", (id_categoria,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_categoria(nombre, descripcion=None):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO categoria (nombre, descripcion) VALUES (%s, %s)",
        (nombre, descripcion)
    )
    conexion.commit()
    id_categoria = cursor.lastrowid
    conexion.close()
    return id_categoria

def actualizar_categoria(id_categoria, nombre, descripcion=None):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE categoria SET nombre = %s, descripcion = %s WHERE id_categoria = %s",
        (nombre, descripcion, id_categoria)
    )
    conexion.commit()
    conexion.close()

def eliminar_categoria(id_categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM categoria WHERE id_categoria = %s", (id_categoria,))
    conexion.commit()
    conexion.close()

def obtener_categoria_por_nombre(nombre):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM categoria WHERE nombre = %s", (nombre,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def obtener_platillos_por_categoria(id_categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("""
        SELECT p.* FROM platillo p 
        WHERE p.id_categoria = %s AND p.estado = 'disponible'
        ORDER BY p.nombre
    """, (id_categoria,))
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def contar_platillos_por_categoria(id_categoria):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("SELECT COUNT(*) FROM platillo WHERE id_categoria = %s", (id_categoria,))
    resultado = cursor.fetchone()[0]
    conexion.close()
    return resultado 