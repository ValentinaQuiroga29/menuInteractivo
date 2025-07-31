from flask import Blueprint, jsonify, request, current_app
from modelos.platillo import (
    obtener_platillos,
    obtener_platillo_por_id,
    insertar_platillo,
    actualizar_platillo,
    eliminar_platillo,
    obtener_platillos_por_categoria,
    obtener_platillos_disponibles,
    cambiar_estado_platillo
)
import os
from werkzeug.utils import secure_filename

platillo_rutas = Blueprint("platillo_rutas", __name__)

@platillo_rutas.route("/", methods=["GET"])
def listar_platillos():
    return jsonify(obtener_platillos())

@platillo_rutas.route("/disponibles", methods=["GET"])
def listar_platillos_disponibles():
    return jsonify(obtener_platillos_disponibles())

@platillo_rutas.route("/categoria/<int:id_categoria>", methods=["GET"])
def listar_platillos_por_categoria(id_categoria):
    return jsonify(obtener_platillos_por_categoria(id_categoria))

@platillo_rutas.route("/<int:id_platillo>", methods=["GET"])
def get_platillo(id_platillo):
    platillo = obtener_platillo_por_id(id_platillo)
    if not platillo:
        return jsonify({"mensaje": "Platillo no encontrado"}), 404
    return jsonify(platillo)

@platillo_rutas.route("/", methods=["POST"])
def crear_platillo():
    nombre = request.form.get('nombre')
    precio = request.form.get('precio')
    descripcion = request.form.get('descripcion')
    id_categoria = request.form.get('id_categoria')

    # Manejo de imagen
    imagen = request.files.get('imagen')
    ruta_imagen = None

    if imagen:
        filename = secure_filename(imagen.filename)
        ruta = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        imagen.save(ruta)
        ruta_imagen = f"/static/uploads/{filename}"

    insertar_platillo(nombre, precio, descripcion, id_categoria, ruta_imagen)

    return jsonify({"mensaje": "Platillo creado"}), 201

@platillo_rutas.route("/<int:id_platillo>", methods=["PUT"])
def actualizar_platillo(id_platillo):
    nombre = request.form.get('nombre')
    precio = request.form.get('precio')
    descripcion = request.form.get('descripcion')
    id_categoria = request.form.get('id_categoria')

    imagen = request.files.get('imagen')
    ruta_imagen = None

    if imagen:
        filename = secure_filename(imagen.filename)
        ruta = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        imagen.save(ruta)
        ruta_imagen = f"/static/uploads/{filename}"

    actualizar_platillo(
        id_platillo,
        nombre,
        precio,
        descripcion,
        id_categoria,
        ruta_imagen
    )

    return jsonify({"mensaje": "Platillo actualizado"}), 200

@platillo_rutas.route("/<int:id_platillo>", methods=["DELETE"])
def borrar_platillo(id_platillo):
    eliminar_platillo(id_platillo)
    return jsonify({"mensaje": "Platillo eliminado exitosamente"})

@platillo_rutas.route("/<int:id_platillo>/estado", methods=["PATCH"])
def cambiar_estado(id_platillo):
    datos = request.json
    nuevo_estado = datos.get("estado")
    if nuevo_estado not in ["disponible", "no disponible"]:
        return jsonify({"mensaje": "Estado inválido. Use 'disponible' o 'no disponible'"}), 400
    
    cambiar_estado_platillo(id_platillo, nuevo_estado)
    return jsonify({"mensaje": f"Estado del platillo cambiado a {nuevo_estado}"}) 