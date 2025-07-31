from backend.conexion import obtener_conexion

def crear_administrador():
    conexion = obtener_conexion()
    cursor = conexion.cursor(dictionary=True)
    
    print("=== CREANDO ADMINISTRADOR ===\n")
    
    # Verificar si ya existe un administrador
    cursor.execute("SELECT * FROM usuario WHERE rol = 'administrador'")
    admin = cursor.fetchone()
    
    if admin:
        print(f"✅ Administrador ya existe: {admin['nombre']} ({admin['correo']})")
    else:
        try:
            cursor.execute("""
                INSERT INTO usuario (nombre, correo, contraseña, rol) 
                VALUES ('Administrador', 'admin@restaurante.com', 'admin123', 'administrador')
            """)
            conexion.commit()
            print("✅ Administrador creado exitosamente:")
            print("   Correo: admin@restaurante.com")
            print("   Contraseña: admin123")
            print("   Rol: administrador")
        except Exception as e:
            print(f"❌ Error al crear administrador: {e}")
    
    # Mostrar todos los usuarios
    cursor.execute("SELECT * FROM usuario")
    usuarios = cursor.fetchall()
    print(f"\n📋 Total de usuarios: {len(usuarios)}")
    for usuario in usuarios:
        print(f"  ID: {usuario['id_usuario']}, Nombre: {usuario['nombre']}, Correo: {usuario['correo']}, Rol: {usuario['rol']}")
    
    conexion.close()

if __name__ == "__main__":
    crear_administrador() 