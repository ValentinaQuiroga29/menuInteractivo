import mysql.connector

def insert_platillos_data():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='menu_interactivo'
        )
        cursor = conexion.cursor()
        
        # Verificar si ya hay datos
        cursor.execute("SELECT COUNT(*) FROM platillo")
        count = cursor.fetchone()[0]
        
        if count > 0:
            print(f"✅ Ya existen {count} platillos en la tabla")
            return
        
        # Datos de ejemplo para platillos con categorías correctas
        platillos_ejemplo = [
            ("Sopa de Tomate", "Sopa cremosa de tomates asados", 9.90, None, "disponible", 1),  # Entradas
            ("Ensalada César", "Lechuga romana, crutones, parmesano y aderezo César", 12.50, None, "disponible", 5),  # Ensaladas
            ("Pasta Carbonara", "Espagueti con salsa cremosa, panceta y parmesano", 18.90, None, "disponible", 2),  # Platos Principales
            ("Hamburguesa Clásica", "Carne de res, lechuga, tomate, queso y papas fritas", 15.00, None, "disponible", 2),  # Platos Principales
            ("Pizza Margherita", "Salsa de tomate, mozzarella y albahaca", 16.50, None, "disponible", 2),  # Platos Principales
            ("Tiramisú", "Postre italiano con café y mascarpone", 8.50, None, "disponible", 3),  # Postres
            ("Limonada Natural", "Limonada fresca con menta", 4.50, None, "disponible", 4),  # Bebidas
            ("Café Americano", "Café negro tradicional", 3.50, None, "disponible", 4)  # Bebidas
        ]
        
        insert_sql = "INSERT INTO platillo (nombre, descripción, precio, imagen, estado, id_categoria) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.executemany(insert_sql, platillos_ejemplo)
        conexion.commit()
        
        print("✅ Datos de ejemplo insertados en la tabla platillo")
        print(f"📝 Se insertaron {len(platillos_ejemplo)} platillos")
        
        conexion.close()
        
    except mysql.connector.Error as err:
        print(f"❌ Error de MySQL: {err}")

if __name__ == "__main__":
    insert_platillos_data() 