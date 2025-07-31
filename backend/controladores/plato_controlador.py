from flask import Blueprint, jsonify, request
from backend.modelos.plato import (
    obtener_platos,
    obtener_plato_por_id,
    insertar_plato,
    actualizar_plato,
    eliminar_plato,
    obtener_platos_por_categoria,
    obtener_platos_disponibles
)

plato_rutas = Blueprint("plato_rutas", __name__)

@plato_rutas.route("/", methods=["GET"])
def listar_platos():
    return jsonify(obtener_platos())

@plato_rutas.route("/disponibles", methods=["GET"])
def listar_platos_disponibles():
    return jsonify(obtener_platos_disponibles())

@plato_rutas.route("/categoria/<categoria>", methods=["GET"])
def listar_platos_por_categoria(categoria):
    return jsonify(obtener_platos_por_categoria(categoria))

@plato_rutas.route("/<int:id_plato>", methods=["GET"])
def get_plato(id_plato):
    plato = obtener_plato_por_id(id_plato)
    if not plato:
        return jsonify({"mensaje": "Plato no encontrado"}), 404
    return jsonify(plato)

@plato_rutas.route("/", methods=["POST"])
def crear_plato():
    datos = request.json
    insertar_plato(
        datos["nombre"], 
        datos["descripcion"], 
        datos["precio"], 
        datos["categoria"], 
        datos.get("disponible", True)
    )
    return jsonify({"mensaje": "Plato creado exitosamente"}), 201

@plato_rutas.route("/<int:id_plato>", methods=["PUT"])
def editar_plato(id_plato):
    datos = request.json
    actualizar_plato(
        id_plato,
        datos["nombre"], 
        datos["descripcion"], 
        datos["precio"], 
        datos["categoria"], 
        datos.get("disponible", True)
    )
    return jsonify({"mensaje": "Plato actualizado exitosamente"})

@plato_rutas.route("/<int:id_plato>", methods=["DELETE"])
def borrar_plato(id_plato):
    eliminar_plato(id_plato)
    return jsonify({"mensaje": "Plato eliminado exitosamente"}) 