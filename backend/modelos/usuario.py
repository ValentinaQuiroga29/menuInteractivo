from conexion import obtener_conexion

def obtener_usuarios():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario")
    resultado = cursor.fetchall()
    conexion.close()
    return resultado

def obtener_usuario_por_id(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuario WHERE id_usuario = %s", (id_usuario,))
    resultado = cursor.fetchone()
    conexion.close()
    return resultado

def insertar_usuario(nombre, correo, contraseña, rol):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "INSERT INTO usuario (nombre, correo, contraseña, rol) VALUES (%s, %s, %s, %s)",
        (nombre, correo, contraseña, rol)
    )
    conexion.commit()
    conexion.close()

def actualizar_usuario(id_usuario, nombre, correo, rol):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute(
        "UPDATE usuario SET nombre = %s, correo = %s, rol = %s WHERE id_usuario = %s",
        (nombre, correo, rol, id_usuario)
    )
    conexion.commit()
    conexion.close()

def eliminar_usuario(id_usuario):
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    cursor.execute("DELETE FROM usuario WHERE id_usuario = %s", (id_usuario,))
    conexion.commit()
    conexion.close()