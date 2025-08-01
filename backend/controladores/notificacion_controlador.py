from flask import Blueprint, jsonify, request
from modelos.notificacion import (
    obtener_notificaciones,
    obtener_notificacion_por_id,
    insertar_notificacion,
    actualizar_notificacion,
    eliminar_notificacion,
    obtener_notificaciones_por_usuario,
    marcar_como_leida,
    obtener_notificaciones_no_leidas
)

notificacion_rutas = Blueprint("notificacion_rutas", __name__)

@notificacion_rutas.route("/", methods=["GET"])
def listar_notificaciones():
    return jsonify(obtener_notificaciones())

@notificacion_rutas.route("/con-detalles", methods=["GET"])
def listar_notificaciones_con_detalles():
    return jsonify(obtener_notificaciones_con_detalles())

@notificacion_rutas.route("/no-leidas", methods=["GET"])
def listar_notificaciones_no_leidas():
    return jsonify(obtener_notificaciones_no_leidas())

@notificacion_rutas.route("/<int:id_notificacion>", methods=["GET"])
def get_notificacion(id_notificacion):
    notificacion = obtener_notificacion_por_id(id_notificacion)
    if not notificacion:
        return jsonify({"mensaje": "Notificación no encontrada"}), 404
    return jsonify(notificacion)

@notificacion_rutas.route("/usuario/<int:id_usuario>", methods=["GET"])
def listar_notificaciones_por_usuario(id_usuario):
    return jsonify(obtener_notificaciones_por_usuario(id_usuario))

@notificacion_rutas.route("/usuario/<int:id_usuario>/no-leidas", methods=["GET"])
def listar_notificaciones_no_leidas_usuario(id_usuario):
    return jsonify(obtener_notificaciones_no_leidas_por_usuario(id_usuario))

@notificacion_rutas.route("/usuario/<int:id_usuario>/contar-no-leidas", methods=["GET"])
def contar_no_leidas_usuario(id_usuario):
    cantidad = contar_notificaciones_no_leidas_usuario(id_usuario)
    return jsonify({"id_usuario": id_usuario, "notificaciones_no_leidas": cantidad})

@notificacion_rutas.route("/pedido/<int:id_pedido>", methods=["GET"])
def listar_notificaciones_por_pedido(id_pedido):
    return jsonify(obtener_notificaciones_por_pedido(id_pedido))

@notificacion_rutas.route("/", methods=["POST"])
def crear_notificacion():
    datos = request.json
    id_notificacion = insertar_notificacion(
        datos["mensaje"],
        datos["id_pedido"],
        datos["id_usuario"],
        datos.get("estado", "no leído")
    )
    return jsonify({"mensaje": "Notificación creada exitosamente", "id_notificacion": id_notificacion}), 201

@notificacion_rutas.route("/<int:id_notificacion>", methods=["PUT"])
def editar_notificacion(id_notificacion):
    datos = request.json
    actualizar_notificacion(
        id_notificacion,
        datos.get("mensaje"),
        datos.get("estado")
    )
    return jsonify({"mensaje": "Notificación actualizada exitosamente"})

@notificacion_rutas.route("/<int:id_notificacion>", methods=["DELETE"])
def borrar_notificacion(id_notificacion):
    eliminar_notificacion(id_notificacion)
    return jsonify({"mensaje": "Notificación eliminada exitosamente"})

@notificacion_rutas.route("/<int:id_notificacion>/marcar-leida", methods=["PATCH"])
def marcar_leida(id_notificacion):
    marcar_como_leida(id_notificacion)
    return jsonify({"mensaje": "Notificación marcada como leída"})

@notificacion_rutas.route("/usuario/<int:id_usuario>/marcar-todas-leidas", methods=["PATCH"])
def marcar_todas_leidas(id_usuario):
    marcar_todas_como_leidas_usuario(id_usuario)
    return jsonify({"mensaje": "Todas las notificaciones marcadas como leídas"})

@notificacion_rutas.route("/<int:id_notificacion>/estado", methods=["PATCH"])
def cambiar_estado_notificacion(id_notificacion):
    datos = request.json
    nuevo_estado = datos.get("estado")
    if nuevo_estado not in ["leído", "no leído"]:
        return jsonify({"mensaje": "Estado inválido. Use 'leído' o 'no leído'"}), 400
    
    actualizar_notificacion(id_notificacion, estado=nuevo_estado)
    return jsonify({"mensaje": f"Estado de la notificación cambiado a {nuevo_estado}"})

@notificacion_rutas.route("/<int:id_usuario>", methods=["GET"])
def obtener_notificaciones_usuario(id_usuario):
    """Devuelve solo las notificaciones del usuario especificado."""
    return jsonify(obtener_notificaciones_por_usuario(id_usuario)) 