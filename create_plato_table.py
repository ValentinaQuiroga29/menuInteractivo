import mysql.connector

def create_plato_table():
    try:
        conexion = mysql.connector.connect(
            host='localhost',
            user='root',
            password='',
            database='menu_interactivo'
        )
        cursor = conexion.cursor()
        
        # Verificar si la tabla existe
        cursor.execute("SHOW TABLES LIKE 'plato'")
        if cursor.fetchone():
            print("✅ La tabla 'plato' ya existe")
            return
        
        # Crear la tabla plato
        create_table_sql = """
        CREATE TABLE plato (
            id_plato INT AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            descripcion TEXT,
            precio DECIMAL(10,2) NOT NULL,
            categoria ENUM('entrada', 'plato_principal', 'postre', 'bebida', 'ensalada') NOT NULL,
            disponible BOOLEAN DEFAULT TRUE,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
        """
        
        cursor.execute(create_table_sql)
        conexion.commit()
        print("✅ Tabla 'plato' creada exitosamente")
        
        # Insertar algunos datos de ejemplo
        datos_ejemplo = [
            ("Ensalada César", "Lechuga romana, crutones, parmesano y aderezo César", 12.50, "ensalada"),
            ("Pasta Carbonara", "Espagueti con salsa cremosa, panceta y parmesano", 18.90, "plato_principal"),
            ("Tiramisú", "Postre italiano con café y mascarpone", 8.50, "postre"),
            ("Limonada Natural", "Limonada fresca con menta", 4.50, "bebida"),
            ("Sopa de Tomate", "Sopa cremosa de tomates asados", 9.90, "entrada")
        ]
        
        insert_sql = "INSERT INTO plato (nombre, descripcion, precio, categoria) VALUES (%s, %s, %s, %s)"
        cursor.executemany(insert_sql, datos_ejemplo)
        conexion.commit()
        print("✅ Datos de ejemplo insertados")
        
        conexion.close()
        
    except mysql.connector.Error as err:
        print(f"❌ Error de MySQL: {err}")

if __name__ == "__main__":
    create_plato_table() 