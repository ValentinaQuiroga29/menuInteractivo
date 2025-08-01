from flask import Blueprint, jsonify, request
from modelos.pedido import (
    obtener_pedidos,
    obtener_pedido_por_id,
    insertar_pedido,
    actualizar_pedido,
    eliminar_pedido,
    obtener_pedidos_por_usuario,
    cambiar_estado_pedido,
    obtener_pedidos_por_estado
)
from modelos.detalle_pedido import insertar_detalle_pedido
from datetime import datetime

pedido_rutas = Blueprint("pedido_rutas", __name__)

@pedido_rutas.route("/", methods=["GET"])
def listar_pedidos():
    return jsonify(obtener_pedidos())

@pedido_rutas.route("/usuario/<int:id_usuario>", methods=["GET"])
def listar_pedidos_usuario(id_usuario):
    return jsonify(obtener_pedidos_por_usuario(id_usuario))

@pedido_rutas.route("/estado/<estado>", methods=["GET"])
def listar_pedidos_por_estado(estado):
    return jsonify(obtener_pedidos_por_estado(estado))

@pedido_rutas.route("/<int:id_pedido>", methods=["GET"])
def get_pedido(id_pedido):
    pedido = obtener_pedido_por_id(id_pedido)
    if not pedido:
        return jsonify({"mensaje": "Pedido no encontrado"}), 404
    return jsonify(pedido)

@pedido_rutas.route("/", methods=["POST"])
def crear_pedido():
    datos = request.json
    
    # Crear el pedido
    id_cliente = datos["id_usuario"]
    fecha_pedido = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    estado = "pendiente"
    
    id_pedido = insertar_pedido(id_cliente, fecha_pedido, estado, 0)
    
    # Crear los detalles del pedido
    detalles = datos.get("detalles", [])
    for detalle in detalles:
        insertar_detalle_pedido(
            id_pedido,
            detalle["id_platillo"],
            detalle["cantidad"],
            detalle["precio_unitario"]
        )
    
    return jsonify({"mensaje": "Pedido creado", "id_pedido": id_pedido}), 201

@pedido_rutas.route("/nuevo_pedido", methods=["POST"])
def nuevo_pedido():
    datos = request.json
    
    # Crear el pedido
    id_cliente = datos["id_cliente"]
    fecha_pedido = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    estado = "pendiente"
    
    id_pedido = insertar_pedido(id_cliente, fecha_pedido, estado, 0)
    
    # Crear los detalles del pedido
    productos = datos.get("productos", [])
    for producto in productos:
        insertar_detalle_pedido(
            id_pedido,
            producto["id"],
            producto["cantidad"],
            producto["precio"]
        )
    
    return jsonify({"mensaje": "Pedido creado", "id_pedido": id_pedido}), 201

@pedido_rutas.route("/<int:id_pedido>", methods=["PUT"])
def editar_pedido(id_pedido):
    datos = request.json
    actualizar_pedido(
        id_pedido,
        datos["id_cliente"],
        datos["fecha_pedido"],
        datos["estado"]
    )
    return jsonify({"mensaje": "Pedido actualizado"})

@pedido_rutas.route("/<int:id_pedido>", methods=["DELETE"])
def borrar_pedido(id_pedido):
    eliminar_pedido(id_pedido)
    return jsonify({"mensaje": "Pedido eliminado"})

@pedido_rutas.route("/<int:id_pedido>/estado", methods=["PATCH"])
def cambiar_estado(id_pedido):
    datos = request.json
    nuevo_estado = datos.get("estado")
    if nuevo_estado not in ["pendiente", "en_preparacion", "listo", "entregado", "cancelado"]:
        return jsonify({"mensaje": "Estado inválido"}), 400
    
    cambiar_estado_pedido(id_pedido, nuevo_estado)
    return jsonify({"mensaje": f"Estado del pedido cambiado a {nuevo_estado}"})

@pedido_rutas.route("/<int:id_pedido>/total", methods=["GET"])
def obtener_total(id_pedido):
    total = calcular_total_pedido(id_pedido)
    return jsonify({"total": total})
