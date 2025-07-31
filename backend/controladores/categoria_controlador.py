from flask import Blueprint, jsonify, request
from modelos.categoria import (
    obtener_categorias,
    obtener_categoria_por_id,
    insertar_categoria,
    actualizar_categoria,
    eliminar_categoria,
    obtener_categoria_por_nombre,
    obtener_platillos_por_categoria,
    contar_platillos_por_categoria
)

categoria_rutas = Blueprint("categoria_rutas", __name__)

@categoria_rutas.route("/", methods=["GET"])
def listar_categorias():
    return jsonify(obtener_categorias())

@categoria_rutas.route("/<int:id_categoria>", methods=["GET"])
def get_categoria(id_categoria):
    categoria = obtener_categoria_por_id(id_categoria)
    if not categoria:
        return jsonify({"mensaje": "Categoría no encontrada"}), 404
    return jsonify(categoria)

@categoria_rutas.route("/nombre/<nombre>", methods=["GET"])
def get_categoria_por_nombre(nombre):
    categoria = obtener_categoria_por_nombre(nombre)
    if not categoria:
        return jsonify({"mensaje": "Categoría no encontrada"}), 404
    return jsonify(categoria)

@categoria_rutas.route("/<int:id_categoria>/platillos", methods=["GET"])
def listar_platillos_por_categoria(id_categoria):
    platillos = obtener_platillos_por_categoria(id_categoria)
    return jsonify(platillos)

@categoria_rutas.route("/<int:id_categoria>/contar-platillos", methods=["GET"])
def contar_platillos(id_categoria):
    cantidad = contar_platillos_por_categoria(id_categoria)
    return jsonify({"id_categoria": id_categoria, "cantidad_platillos": cantidad})

@categoria_rutas.route("/", methods=["POST"])
def crear_categoria():
    datos = request.json
    id_categoria = insertar_categoria(
        datos["nombre"], 
        datos.get("descripcion")
    )
    return jsonify({"mensaje": "Categoría creada exitosamente", "id_categoria": id_categoria}), 201

@categoria_rutas.route("/<int:id_categoria>", methods=["PUT"])
def editar_categoria(id_categoria):
    datos = request.json
    actualizar_categoria(
        id_categoria,
        datos["nombre"], 
        datos.get("descripcion")
    )
    return jsonify({"mensaje": "Categoría actualizada exitosamente"})

@categoria_rutas.route("/<int:id_categoria>", methods=["DELETE"])
def borrar_categoria(id_categoria):
    # Verificar si la categoría tiene platillos asociados
    cantidad = contar_platillos_por_categoria(id_categoria)
    if cantidad > 0:
        return jsonify({
            "mensaje": "No se puede eliminar la categoría porque tiene platillos asociados",
            "platillos_asociados": cantidad
        }), 400
    
    eliminar_categoria(id_categoria)
    return jsonify({"mensaje": "Categoría eliminada exitosamente"}) 