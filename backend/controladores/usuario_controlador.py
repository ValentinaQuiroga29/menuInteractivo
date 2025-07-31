# backend/controladores/usuario_controlador.py

from flask import Blueprint, jsonify, request
from backend.modelos.usuario import (
    obtener_usuarios,
    obtener_usuario_por_id,
    insertar_usuario,
    actualizar_usuario,
    eliminar_usuario
)

usuario_rutas = Blueprint("usuario_rutas", __name__)

@usuario_rutas.route("/", methods=["GET"])
def listar_usuarios():
    return jsonify(obtener_usuarios())

@usuario_rutas.route("/<int:id_usuario>", methods=["GET"])
def get_usuario(id_usuario):
    user = obtener_usuario_por_id(id_usuario)
    if not user:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    return jsonify(user)

@usuario_rutas.route("/", methods=["POST"])
def crear_usuario():
    datos = request.json
    insertar_usuario(
        datos["nombre"], datos["correo"], datos["contraseña"], datos["rol"]
    )
    return jsonify({"mensaje": "Usuario creado"}), 201

@usuario_rutas.route("/<int:id_usuario>", methods=["PUT"])
def editar_usuario(id_usuario):
    datos = request.json
    actualizar_usuario(
        id_usuario, datos["nombre"], datos["correo"], datos["rol"]
    )
    return jsonify({"mensaje": "Usuario actualizado"})

@usuario_rutas.route("/<int:id_usuario>", methods=["DELETE"])
def borrar_usuario(id_usuario):
    eliminar_usuario(id_usuario)
    return jsonify({"mensaje": "Usuario eliminado"})
