from conexion import obtener_conexion

def agregar_columnas_platillo():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    print("=== AGREGANDO COLUMNAS A LA TABLA PLATILLO ===\n")
    
    try:
        # Verificar si las columnas ya existen
        cursor.execute("DESCRIBE platillo")
        columnas_existentes = [columna[0] for columna in cursor.fetchall()]
        
        print(f"Columnas existentes: {columnas_existentes}")
        
        # Agregar columna descripcion si no existe
        if 'descripcion' not in columnas_existentes:
            cursor.execute("ALTER TABLE platillo ADD COLUMN descripcion VARCHAR(255) NULL")
            print("✅ Columna 'descripcion' agregada exitosamente")
        else:
            print("ℹ️  La columna 'descripcion' ya existe")
        
        # Agregar columna imagen si no existe
        if 'imagen' not in columnas_existentes:
            cursor.execute("ALTER TABLE platillo ADD COLUMN imagen VARCHAR(255) NULL")
            print("✅ Columna 'imagen' agregada exitosamente")
        else:
            print("ℹ️  La columna 'imagen' ya existe")
        
        conexion.commit()
        
        # Mostrar la estructura final de la tabla
        print("\n=== ESTRUCTURA FINAL DE LA TABLA PLATILLO ===")
        cursor.execute("DESCRIBE platillo")
        columnas_finales = cursor.fetchall()
        
        for columna in columnas_finales:
            print(f"  {columna[0]} - {columna[1]} - {columna[2]} - {columna[3]} - {columna[4]} - {columna[5]}")
        
        print("\n🎉 ¡Tabla platillo lista para el CRUD completo!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        conexion.rollback()
    finally:
        conexion.close()

if __name__ == "__main__":
    agregar_columnas_platillo() 