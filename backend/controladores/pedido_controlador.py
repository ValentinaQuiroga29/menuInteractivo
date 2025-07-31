from flask import Blueprint, jsonify, request
from modelos.pedido import (
    obtener_pedidos,
    obtener_pedido_por_id,
    insertar_pedido,
    actualizar_pedido,
    eliminar_pedido,
    obtener_pedidos_por_cliente,
    obtener_pedidos_por_mesero,
    obtener_pedidos_por_estado,
    obtener_pedidos_pendientes,
    obtener_pedidos_en_preparacion,
    actualizar_pedido_mesero
)
from modelos.detalle_pedido import insertar_detalle_pedido

pedido_rutas = Blueprint("pedido_rutas", __name__)

@pedido_rutas.route("/", methods=["GET"])
def listar_pedidos():
    return jsonify(obtener_pedidos())

@pedido_rutas.route("/pendientes", methods=["GET"])
def listar_pedidos_pendientes():
    return jsonify(obtener_pedidos_pendientes())

@pedido_rutas.route("/en-preparacion", methods=["GET"])
def listar_pedidos_en_preparacion():
    return jsonify(obtener_pedidos_en_preparacion())

@pedido_rutas.route("/estado/<estado>", methods=["GET"])
def listar_pedidos_por_estado(estado):
    return jsonify(obtener_pedidos_por_estado(estado))

@pedido_rutas.route("/cliente/<int:id_cliente>", methods=["GET"])
def listar_pedidos_por_cliente(id_cliente):
    return jsonify(obtener_pedidos_por_cliente(id_cliente))

@pedido_rutas.route("/mesero/<int:id_mesero>", methods=["GET"])
def listar_pedidos_por_mesero(id_mesero):
    return jsonify(obtener_pedidos_por_mesero(id_mesero))

@pedido_rutas.route("/<int:id_pedido>", methods=["GET"])
def get_pedido(id_pedido):
    pedido = obtener_pedido_por_id(id_pedido)
    if not pedido:
        return jsonify({"mensaje": "Pedido no encontrado"}), 404
    return jsonify(pedido)

@pedido_rutas.route("/", methods=["POST"])
def crear_pedido():
    datos = request.json
    id_pedido = insertar_pedido(
        datos["id_cliente"], 
        datos["id_mesero"], 
        datos.get("estado", "pendiente")
    )
    return jsonify({"mensaje": "Pedido creado exitosamente", "id_pedido": id_pedido}), 201

@pedido_rutas.route("/<int:id_pedido>", methods=["PUT"])
def editar_pedido(id_pedido):
    datos = request.json
    actualizar_pedido(id_pedido, datos["estado"])
    return jsonify({"mensaje": "Pedido actualizado exitosamente"})

@pedido_rutas.route("/<int:id_pedido>", methods=["DELETE"])
def borrar_pedido(id_pedido):
    eliminar_pedido(id_pedido)
    return jsonify({"mensaje": "Pedido eliminado exitosamente"})

@pedido_rutas.route("/<int:id_pedido>/estado", methods=["PATCH"])
def cambiar_estado_pedido(id_pedido):
    datos = request.json
    nuevo_estado = datos.get("estado")
    if nuevo_estado not in ["pendiente", "en preparación", "listo", "entregado"]:
        return jsonify({"mensaje": "Estado inválido. Use 'pendiente', 'en preparación', 'listo' o 'entregado'"}), 400

    actualizar_pedido(id_pedido, nuevo_estado)
    return jsonify({"mensaje": f"Estado del pedido cambiado a {nuevo_estado}"})

@pedido_rutas.route("/nuevo_pedido", methods=["POST"])
def nuevo_pedido():
    try:
        data = request.get_json()
        print("Pedido recibido:", data)

        if not data:
            return jsonify({"error": "No se recibieron datos JSON"}), 400

        id_cliente = data.get("id_cliente")
        id_mesero = data.get("id_mesero") or 1
        productos = data.get("productos", [])

        if not id_cliente or not productos:
            return jsonify({"error": "Datos incompletos"}), 400

        id_pedido = insertar_pedido(id_cliente, id_mesero)

        for prod in productos:
            id_platillo = prod.get("id_platillo")
            cantidad = prod.get("cantidad", 1)
            if id_platillo and cantidad > 0:
                insertar_detalle_pedido(id_pedido, id_platillo, cantidad)

        return jsonify({"success": True, "id_pedido": id_pedido}), 201

    except Exception as e:
        print("❌ Error interno en nuevo_pedido:", e)
        return jsonify({"error": "Error al procesar pedido", "detalle": str(e)}), 500

@pedido_rutas.route("/transacciones", methods=["POST"])
def registrar_pago():
    data = request.get_json()
    id_pedido = data.get("id_pedido")
    metodo_pago = data.get("metodo_pago")
    id_mesero = data.get("id_mesero")

    if not id_pedido or not metodo_pago or not id_mesero:
        return jsonify({"error": "Datos incompletos"}), 400

    actualizar_pedido_mesero(id_pedido, 'pagado', id_mesero)
    return jsonify({"mensaje": "Pago registrado correctamente."}), 200
