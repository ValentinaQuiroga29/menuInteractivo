# backend/app.py

from flask import Flask, send_from_directory
from flask_cors import CORS
from controladores.usuario_controlador import usuario_rutas
from controladores.platillo_controlador import platillo_rutas
from controladores.pedido_controlador import pedido_rutas
from controladores.categoria_controlador import categoria_rutas
from controladores.detalle_pedido_controlador import detalle_pedido_rutas
from controladores.notificacion_controlador import notificacion_rutas
import os


app = Flask(__name__)

# Configuración de CORS para desarrollo
CORS(app, 
     origins=["http://localhost:5173", "http://192.168.2.7:5173", "http://127.0.0.1:5173"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
     allow_headers=["Content-Type", "Authorization"],
     supports_credentials=False)

app.config['UPLOAD_FOLDER'] = 'backend/static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Asegura que el directorio exista
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Ruta para servir archivos estáticos (imágenes)
@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Ruta de prueba para verificar CORS
@app.route('/test-cors', methods=['GET', 'POST', 'OPTIONS'])
def test_cors():
    return {"message": "CORS funcionando correctamente"}

app.register_blueprint(usuario_rutas, url_prefix="/usuarios")
app.register_blueprint(platillo_rutas, url_prefix="/platillos")
app.register_blueprint(pedido_rutas, url_prefix="/pedidos")
app.register_blueprint(categoria_rutas, url_prefix="/categorias")
app.register_blueprint(detalle_pedido_rutas, url_prefix="/detalles-pedido")
app.register_blueprint(notificacion_rutas, url_prefix="/notificaciones")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
