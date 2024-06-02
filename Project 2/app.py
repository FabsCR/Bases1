from flask import Flask, request, jsonify
import MySQLdb
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return MySQLdb.connect(
        user='admin_user',
        passwd='UsuarioAdministrador123',
        host='localhost',
        db='proyecto_basededatos1'
    )

@app.route('/persona', methods=['POST'])
def create_persona():
    db = get_db_connection()
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    cursor = db.cursor()
    cursor.execute("SELECT insert_persona(%s, %s)", (nombre, apellido))
    db.commit()
    persona_id = cursor.fetchone()[0]
    cursor.close()
    db.close()
    return jsonify({'id': persona_id}), 201

@app.route('/persona/<int:codigo>', methods=['DELETE'])
def delete_persona(codigo):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT delete_persona(%s)", (codigo,))
    db.commit()
    result = cursor.fetchone()[0]
    cursor.close()
    db.close()
    return jsonify({'deleted': result}), 200

@app.route('/persona/<int:codigo>', methods=['PUT'])
def update_persona(codigo):
    db = get_db_connection()
    nombre = request.json['nombre']
    apellido = request.json['apellido']
    cursor = db.cursor()
    cursor.execute("SELECT update_persona(%s, %s, %s)", (codigo, nombre, apellido))
    db.commit()
    result = cursor.fetchone()[0]
    cursor.close()
    db.close()
    return jsonify({'updated': result}), 200

@app.route('/persona', methods=['GET'])
def get_personas():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Persona")
    rows = cursor.fetchall()
    personas = [{'codigoPersona': row[0], 'nombre': row[1], 'apellido': row[2]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(personas), 200

if __name__ == '__main__':
    app.run(debug=True)
