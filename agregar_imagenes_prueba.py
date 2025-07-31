from backend.conexion import obtener_conexion

def agregar_platillos_con_imagenes():
    conexion = obtener_conexion()
    cursor = conexion.cursor()
    
    print("=== AGREGANDO PLATILLOS CON IMÁGENES DE PRUEBA ===\n")
    
    # Platillos de ejemplo con URLs de imágenes
    platillos_ejemplo = [
        {
            'nombre': 'Hamburguesa Clásica',
            'precio': 12.99,
            'descripcion': 'Hamburguesa con carne de res, lechuga, tomate, cebolla y queso cheddar',
            'id_categoria': 1,
            'imagen': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
        },
        {
            'nombre': 'Pizza Margherita',
            'precio': 15.99,
            'descripcion': 'Pizza tradicional con salsa de tomate, mozzarella y albahaca fresca',
            'id_categoria': 2,
            'imagen': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop'
        },
        {
            'nombre': 'Ensalada César',
            'precio': 8.99,
            'descripcion': 'Ensalada fresca con lechuga romana, crutones, parmesano y aderezo césar',
            'id_categoria': 3,
            'imagen': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop'
        },
        {
            'nombre': 'Pasta Carbonara',
            'precio': 14.99,
            'descripcion': 'Pasta con salsa cremosa, panceta, huevo y queso parmesano',
            'id_categoria': 2,
            'imagen': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop'
        },
        {
            'nombre': 'Smoothie de Frutas',
            'precio': 6.99,
            'descripcion': 'Bebida refrescante con fresas, plátano y yogurt natural',
            'id_categoria': 4,
            'imagen': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop'
        }
    ]
    
    try:
        for platillo in platillos_ejemplo:
            # Verificar si el platillo ya existe
            cursor.execute("SELECT * FROM platillo WHERE nombre = %s", (platillo['nombre'],))
            if cursor.fetchone():
                print(f"ℹ️  Platillo '{platillo['nombre']}' ya existe")
                continue
            
            # Insertar el platillo
            cursor.execute("""
                INSERT INTO platillo (nombre, precio, descripcion, id_categoria, imagen) 
                VALUES (%s, %s, %s, %s, %s)
            """, (
                platillo['nombre'],
                platillo['precio'],
                platillo['descripcion'],
                platillo['id_categoria'],
                platillo['imagen']
            ))
            print(f"✅ Platillo '{platillo['nombre']}' agregado con imagen")
        
        conexion.commit()
        print(f"\n🎉 Se agregaron {len(platillos_ejemplo)} platillos con imágenes")
        
        # Mostrar platillos existentes
        cursor.execute("SELECT nombre, imagen FROM platillo")
        platillos = cursor.fetchall()
        print(f"\n📋 Total de platillos en la base de datos: {len(platillos)}")
        for p in platillos:
            print(f"  - {p[0]}: {p[1] or 'Sin imagen'}")
            
    except Exception as e:
        print(f"❌ Error: {e}")
        conexion.rollback()
    finally:
        conexion.close()

if __name__ == "__main__":
    agregar_platillos_con_imagenes() 