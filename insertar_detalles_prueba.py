from backend.modelos.detalle_pedido import insertar_detalle_pedido

def insertar_detalles_prueba():
    print("=== INSERTANDO DETALLES DE PEDIDO DE PRUEBA ===\n")
    
    # Agregar detalles al pedido 1
    print("Agregando detalles al pedido 1...")
    detalle1 = insertar_detalle_pedido(1, 9, 2)  # 2 Sopa de Tomate
    print(f"  Detalle creado con ID: {detalle1}")
    
    detalle2 = insertar_detalle_pedido(1, 11, 1)  # 1 Pasta Carbonara
    print(f"  Detalle creado con ID: {detalle2}")
    
    detalle3 = insertar_detalle_pedido(1, 14, 1)  # 1 Tiramisú
    print(f"  Detalle creado con ID: {detalle3}")
    
    # Agregar detalles al pedido 2
    print("\nAgregando detalles al pedido 2...")
    detalle4 = insertar_detalle_pedido(2, 10, 1)  # 1 Ensalada César
    print(f"  Detalle creado con ID: {detalle4}")
    
    detalle5 = insertar_detalle_pedido(2, 12, 2)  # 2 Hamburguesa Clásica
    print(f"  Detalle creado con ID: {detalle5}")
    
    detalle6 = insertar_detalle_pedido(2, 15, 2)  # 2 Limonada Natural
    print(f"  Detalle creado con ID: {detalle6}")
    
    # Agregar detalles al pedido 3
    print("\nAgregando detalles al pedido 3...")
    detalle7 = insertar_detalle_pedido(3, 13, 1)  # 1 Pizza Margherita
    print(f"  Detalle creado con ID: {detalle7}")
    
    detalle8 = insertar_detalle_pedido(3, 16, 1)  # 1 Café Americano
    print(f"  Detalle creado con ID: {detalle8}")
    
    print("\n¡Detalles de pedido insertados exitosamente!")
    print("Ahora puedes probar el endpoint GET /detalles-pedido/pedido/1")

if __name__ == "__main__":
    insertar_detalles_prueba() 