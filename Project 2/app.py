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

@app.route('/editorial', methods=['POST'])
def create_editorial():
    db = get_db_connection()
    nombre = request.json['nombre']
    pais = request.json['pais']
    cursor = db.cursor()
    cursor.execute("SELECT insert_editorial(%s, %s)", (nombre, pais))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Editorial creada'}), 201

@app.route('/editorial/<string:nombre>', methods=['DELETE'])
def delete_editorial(nombre):
    db = get_db_connection()
    cursor = db.cursor()
    try:
        # Eliminar registros relacionados en la tabla autor
        cursor.execute("DELETE FROM autor WHERE Editorial_A = %s", (nombre,))
        db.commit()
        
        # Luego, eliminar la editorial
        cursor.execute("DELETE FROM editorial WHERE Nombre = %s", (nombre,))
        db.commit()
        
        cursor.close()
        db.close()
        return jsonify({'deleted': True}), 200
    except MySQLdb.IntegrityError as e:
        db.rollback()
        cursor.close()
        db.close()
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.rollback()
        cursor.close()
        db.close()
        return jsonify({'error': str(e)}), 500

@app.route('/editorial/<string:nombre>', methods=['PUT'])
def update_editorial(nombre):
    db = get_db_connection()
    pais = request.json['pais']
    cursor = db.cursor()
    try:
        cursor.execute("SELECT update_editorial(%s, %s)", (nombre, pais))
        db.commit()
        result = cursor.fetchone()[0] if cursor.fetchone() else None
    except MySQLdb.IntegrityError as e:
        db.rollback()
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        db.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        db.close()
    return jsonify({'updated': result}), 200

@app.route('/editorial', methods=['GET'])
def get_editoriales():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Editorial")
    rows = cursor.fetchall()
    editoriales = [{'nombre': row[0], 'pais': row[1]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(editoriales), 200

# Autor

@app.route('/autor', methods=['POST'])
def create_autor():
    db = get_db_connection()
    print("Datos recibidos:", request.json)  # Agregar esta línea para imprimir los datos recibidos
    id_persona = request.json['id_persona']
    editorial = request.json['editorial']
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Autor (IDPersona, Editorial_A) VALUES (%s, %s)", (id_persona, editorial))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({'message': 'Autor creado'}), 201
    except Exception as e:
        print("Error al crear autor:", e) 
        return jsonify({'error': str(e)}), 500


@app.route('/autor/<int:id_autor>', methods=['DELETE'])
def delete_autor(id_autor):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM Autor WHERE IDAutor = %s", (id_autor,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'deleted': True}), 200

@app.route('/autor/<int:id_autor>', methods=['PUT'])
def update_autor(id_autor):
    db = get_db_connection()
    id_persona = request.json['id_persona']
    editorial = request.json['editorial']
    cursor = db.cursor()
    cursor.execute("UPDATE Autor SET IDPersona = %s, Editorial_A = %s WHERE IDAutor = %s", (id_persona, editorial, id_autor))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'updated': True}), 200

@app.route('/autor', methods=['GET'])
def get_autores():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Autor")
    rows = cursor.fetchall()
    autores = [{'id_autor': row[0], 'id_persona': row[1], 'editorial': row[2]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(autores), 200


if __name__ == '__main__':
    app.run(debug=True)
