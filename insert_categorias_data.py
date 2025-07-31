import mysql.connector

def insert_categorias_data():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='menu_interactivo'
        )
        cursor = conexion.cursor()
        
        # Verificar si ya hay datos
        cursor.execute("SELECT COUNT(*) FROM categoría")
        count = cursor.fetchone()[0]
        
        if count > 0:
            print(f"✅ Ya existen {count} categorías en la tabla")
            return
        
        # Datos de ejemplo para categorías
        categorias_ejemplo = [
            ("Entradas", "Platos pequeños para comenzar la comida"),
            ("Platos Principales", "Platos fuertes y principales"),
            ("Postres", "Dulces y postres"),
            ("Bebidas", "Bebidas y refrescos"),
            ("Ensaladas", "Ensaladas frescas y saludables")
        ]
        
        insert_sql = "INSERT INTO categoría (nombre, descripción) VALUES (%s, %s)"
        cursor.executemany(insert_sql, categorias_ejemplo)
        conexion.commit()
        
        print("✅ Categorías insertadas exitosamente")
        print(f"📝 Se insertaron {len(categorias_ejemplo)} categorías")
        
        # Mostrar las categorías insertadas
        cursor.execute("SELECT * FROM categoría")
        categorias = cursor.fetchall()
        print("\n📋 Categorías disponibles:")
        for categoria in categorias:
            print(f"  ID: {categoria[0]}, Nombre: {categoria[1]}")
        
        conexion.close()
        
    except mysql.connector.Error as err:
        print(f"❌ Error de MySQL: {err}")

if __name__ == "__main__":
    insert_categorias_data() 