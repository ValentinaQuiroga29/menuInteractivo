from flask import Blueprint, jsonify, request
from modelos.detalle_pedido import (
    obtener_detalles_pedido,
    obtener_detalle_por_id,
    insertar_detalle_pedido,
    actualizar_detalle_pedido,
    eliminar_detalle_pedido,
    obtener_detalles_por_pedido,
    obtener_detalles_con_platillos,
    calcular_total_pedido,
    contar_platillos_por_pedido,
    verificar_platillo_en_pedido,
    actualizar_cantidad_platillo_en_pedido
)

detalle_pedido_rutas = Blueprint("detalle_pedido_rutas", __name__)

@detalle_pedido_rutas.route("/", methods=["GET"])
def listar_detalles():
    return jsonify(obtener_detalles_pedido())

@detalle_pedido_rutas.route("/con-platillos", methods=["GET"])
def listar_detalles_con_platillos():
    return jsonify(obtener_detalles_con_platillos())

@detalle_pedido_rutas.route("/<int:id_detalle>", methods=["GET"])
def get_detalle(id_detalle):
    detalle = obtener_detalle_por_id(id_detalle)
    if not detalle:
        return jsonify({"mensaje": "Detalle no encontrado"}), 404
    return jsonify(detalle)

@detalle_pedido_rutas.route("/pedido/<int:id_pedido>", methods=["GET"])
def listar_detalles_por_pedido(id_pedido):
    return jsonify(obtener_detalles_por_pedido(id_pedido))

@detalle_pedido_rutas.route("/pedido/<int:id_pedido>/total", methods=["GET"])
def total_pedido(id_pedido):
    total = calcular_total_pedido(id_pedido)
    return jsonify({"id_pedido": id_pedido, "total": total})

@detalle_pedido_rutas.route("/pedido/<int:id_pedido>/contar", methods=["GET"])
def contar_platillos(id_pedido):
    cantidad = contar_platillos_por_pedido(id_pedido)
    return jsonify({"id_pedido": id_pedido, "cantidad_platillos": cantidad})

@detalle_pedido_rutas.route("/", methods=["POST"])
def crear_detalle():
    datos = request.json
    id_detalle = insertar_detalle_pedido(
        datos["id_pedido"],
        datos["id_platillo"],
        datos["cantidad"]
    )
    return jsonify({"mensaje": "Detalle creado exitosamente", "id_detalle": id_detalle}), 201

@detalle_pedido_rutas.route("/<int:id_detalle>", methods=["PUT"])
def editar_detalle(id_detalle):
    datos = request.json
    actualizar_detalle_pedido(id_detalle, datos["cantidad"])
    return jsonify({"mensaje": "Detalle actualizado exitosamente"})

@detalle_pedido_rutas.route("/<int:id_detalle>", methods=["DELETE"])
def borrar_detalle(id_detalle):
    eliminar_detalle_pedido(id_detalle)
    return jsonify({"mensaje": "Detalle eliminado exitosamente"})

@detalle_pedido_rutas.route("/pedido/<int:id_pedido>/platillo/<int:id_platillo>", methods=["GET"])
def get_platillo_en_pedido(id_pedido, id_platillo):
    detalle = verificar_platillo_en_pedido(id_pedido, id_platillo)
    if not detalle:
        return jsonify({"mensaje": "No existe ese platillo en el pedido"}), 404
    return jsonify(detalle)

@detalle_pedido_rutas.route("/pedido/<int:id_pedido>/platillo/<int:id_platillo>", methods=["PATCH"])
def actualizar_cantidad(id_pedido, id_platillo):
    datos = request.json
    nueva_cantidad = datos.get("cantidad")
    if not isinstance(nueva_cantidad, int) or nueva_cantidad < 1:
        return jsonify({"mensaje": "Cantidad inválida"}), 400
    actualizar_cantidad_platillo_en_pedido(id_pedido, id_platillo, nueva_cantidad)
    return jsonify({"mensaje": "Cantidad actualizada correctamente"}) 