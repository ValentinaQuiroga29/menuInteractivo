import mysql.connector

def verify_plato_table():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='menu_interactivo'
        )
        cursor = conexion.cursor(dictionary=True)
        
        # Verificar si la tabla existe
        cursor.execute("SHOW TABLES LIKE 'plato'")
        if not cursor.fetchone():
            print("❌ La tabla 'plato' no existe")
            return
        
        print("✅ La tabla 'plato' existe")
        
        # Mostrar estructura
        cursor.execute("DESCRIBE plato")
        columns = cursor.fetchall()
        print("\n📋 Estructura de la tabla 'plato':")
        print("-" * 50)
        for column in columns:
            print(f"Columna: {column['Field']}, Tipo: {column['Type']}, Null: {column['Null']}, Key: {column['Key']}")
        
        # Mostrar datos
        cursor.execute("SELECT * FROM plato")
        platos = cursor.fetchall()
        print(f"\n🍽️  Platos en la base de datos ({len(platos)}):")
        print("-" * 50)
        for plato in platos:
            print(f"ID: {plato['id_plato']}, Nombre: {plato['nombre']}, Precio: ${plato['precio']}, Categoría: {plato['categoria']}")
        
        conexion.close()
        
    except mysql.connector.Error as err:
        print(f"❌ Error de MySQL: {err}")

if __name__ == "__main__":
    verify_plato_table() 