from conexion import obtener_conexion

def agregar_columna_descripcion():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    try:
        cursor.execute("DESCRIBE platillo")
        columnas = [col[0] for col in cursor.fetchall()]
        if 'descripcion' not in columnas:
            cursor.execute("ALTER TABLE platillo ADD COLUMN descripcion VARCHAR(255) NULL")
            conexion.commit()
            print("✅ Columna 'descripcion' agregada exitosamente.")
        else:
            print("ℹ️  La columna 'descripcion' ya existe.")
    except Exception as e:
        print(f"❌ Error: {e}")
        conexion.rollback()
    finally:
        conexion.close()

if __name__ == "__main__":
    agregar_columna_descripcion() 