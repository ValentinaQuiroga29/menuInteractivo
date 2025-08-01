# backend/controladores/usuario_controlador.py

from flask import Blueprint, jsonify, request
from modelos.usuario import (
    obtener_usuarios,
    obtener_usuario_por_id,
    insertar_usuario,
    actualizar_usuario,
    eliminar_usuario,
    autenticar_usuario
)

usuario_rutas = Blueprint("usuario_rutas", __name__)

@usuario_rutas.route("/login", methods=["POST"])
def login():
    datos = request.json
    correo = datos.get("correo")
    contraseña = datos.get("contraseña")
    
    if not correo or not contraseña:
        return jsonify({"error": "Correo y contraseña son requeridos"}), 400
    
    usuario = autenticar_usuario(correo, contraseña)
    
    if usuario:
        # No enviar la contraseña en la respuesta
        usuario_sin_password = {
            "id_usuario": usuario["id_usuario"],
            "nombre": usuario["nombre"],
            "correo": usuario["correo"],
            "rol": usuario["rol"]
        }
        return jsonify({
            "mensaje": "Login exitoso",
            "usuario": usuario_sin_password
        }), 200
    else:
        return jsonify({"error": "Credenciales inválidas"}), 401

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
    # Verificar si el usuario existe
    usuario_existente = obtener_usuario_por_id(id_usuario)
    if not usuario_existente:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    
    datos = request.json
    
    # Validar datos requeridos
    if not datos.get("nombre") or not datos.get("correo") or not datos.get("rol"):
        return jsonify({"mensaje": "Nombre, correo y rol son requeridos"}), 400
    
    try:
        actualizar_usuario(
            id_usuario, datos["nombre"], datos["correo"], datos["rol"]
        )
        return jsonify({"mensaje": "Usuario actualizado exitosamente"}), 200
    except Exception as e:
        return jsonify({"mensaje": f"Error al actualizar usuario: {str(e)}"}), 500

@usuario_rutas.route("/<int:id_usuario>", methods=["DELETE"])
def borrar_usuario(id_usuario):
    eliminar_usuario(id_usuario)
    return jsonify({"mensaje": "Usuario eliminado"})
