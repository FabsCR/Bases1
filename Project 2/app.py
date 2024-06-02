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

# Rutas Persona

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

# Rutas Editorial

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
        
        # eliminar la editorial
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

# Rutas Autor

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
    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Verificar si el autor existe
        cursor.execute("SELECT IDAutor FROM Autor WHERE IDAutor = %s", (id_autor,))
        if not cursor.fetchone():
            return jsonify({'error': f'El autor con ID {id_autor} no existe'}), 404

        # Eliminar el autor
        cursor.execute("DELETE FROM Autor WHERE IDAutor = %s", (id_autor,))
        db.commit()

        cursor.close()
        db.close()

        return jsonify({'message': f'Autor con ID {id_autor} eliminado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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


# Rutas Usuario

@app.route('/usuario', methods=['POST'])
def create_usuario():
    db = get_db_connection()
    id_persona = request.json['id_persona']
    correo = request.json['correo']
    telefono = request.json['telefono']
    cursor = db.cursor()
    cursor.execute("INSERT INTO Usuario (IDPersona, Correo, telefono) VALUES (%s, %s, %s)", (id_persona, correo, telefono))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Usuario creado'}), 201

@app.route('/usuario/<int:id_usuario>', methods=['DELETE'])
def delete_usuario(id_usuario):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM Usuario WHERE IDUsuario = %s", (id_usuario,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'deleted': True}), 200

@app.route('/usuario/<int:id_usuario>', methods=['PUT'])
def update_usuario(id_usuario):
    db = get_db_connection()
    id_persona = request.json['id_persona']
    correo = request.json['correo']
    telefono = request.json['telefono']
    cursor = db.cursor()
    cursor.execute("UPDATE Usuario SET IDPersona = %s, Correo = %s, telefono = %s WHERE IDUsuario = %s", (id_persona, correo, telefono, id_usuario))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'updated': True}), 200

@app.route('/usuario', methods=['GET'])
def get_usuarios():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Usuario")
    rows = cursor.fetchall()
    usuarios = [{'id_usuario': row[0], 'id_persona': row[1], 'correo': row[2], 'telefono': row[3]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(usuarios), 200

# Rutas Genero

@app.route('/genero', methods=['POST'])
def create_genero():
    db = get_db_connection()
    nombre = request.json['nombre']
    cursor = db.cursor()
    cursor.execute("INSERT INTO Genero (Nombre) VALUES (%s)", (nombre,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'message': 'Género creado'}), 201

@app.route('/genero/<string:nombre>', methods=['DELETE'])
def delete_genero(nombre):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM Genero WHERE Nombre = %s", (nombre,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'deleted': True}), 200

@app.route('/genero/<string:nombre>', methods=['PUT'])
def update_genero(nombre):
    db = get_db_connection()
    nuevo_nombre = request.json['nombre']
    cursor = db.cursor()
    cursor.execute("UPDATE Genero SET Nombre = %s WHERE Nombre = %s", (nuevo_nombre, nombre))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'updated': True}), 200

@app.route('/genero', methods=['GET'])
def get_generos():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Genero")
    rows = cursor.fetchall()
    generos = [{'nombre': row[0]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(generos), 200

# Rutas Libro

@app.route('/libro', methods=['POST'])
def create_libro():
    db = get_db_connection()
    titulo = request.json['titulo']
    anio_publicacion = request.json['anio_publicacion']
    genero = request.json['genero']
    editorial = request.json['editorial']
    autor = request.json['autor']
    cursor = db.cursor()
    try:
        cursor.execute("INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Editorial, Autor) VALUES (%s, %s, %s, %s, %s)", (titulo, anio_publicacion, genero, editorial, autor))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({'message': 'Libro creado'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/libro/<int:id_libro>', methods=['DELETE'])
def delete_libro(id_libro):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("DELETE FROM Libro WHERE IDLibro = %s", (id_libro,))
    db.commit()
    cursor.close()
    db.close()
    return jsonify({'deleted': True}), 200

@app.route('/libro/<int:id_libro>', methods=['PUT'])
def update_libro(id_libro):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        # Obtener datos del libro a actualizar desde el cuerpo de la solicitud
        data = request.json
        titulo = data.get('titulo')
        anio_publicacion = data.get('anio_publicacion')
        genero = data.get('genero')
        editorial = data.get('editorial')
        autor = data.get('autor')

        # Verificar si el género existe en la tabla Genero
        cursor.execute("SELECT Nombre FROM Genero WHERE Nombre = %s", (genero,))
        if not cursor.fetchone():
            return jsonify({'error': f'El género "{genero}" no existe en la tabla Genero'}), 400

        # Verificar si la editorial existe en la tabla Editorial
        cursor.execute("SELECT Nombre FROM Editorial WHERE Nombre = %s", (editorial,))
        if not cursor.fetchone():
            return jsonify({'error': f'La editorial "{editorial}" no existe en la tabla Editorial'}), 400

        # Verificar si el autor existe en la tabla Autor
        cursor.execute("SELECT IDAutor FROM Autor WHERE IDAutor = %s", (autor,))
        if not cursor.fetchone():
            return jsonify({'error': f'El autor con ID {autor} no existe en la tabla Autor'}), 400

        # Actualizar el libro en la base de datos
        cursor.execute("UPDATE Libro SET Titulo = %s, AnioPublicacion = %s, Genero = %s, Editorial = %s, Autor = %s WHERE IDLibro = %s", (titulo, anio_publicacion, genero, editorial, autor, id_libro))
        db.commit()

        cursor.close()
        db.close()

        return jsonify({'message': 'Libro actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/libro', methods=['GET'])
def get_libros():
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM Libro")
    rows = cursor.fetchall()
    libros = [{'id_libro': row[0], 'titulo': row[1], 'anio_publicacion': row[2], 'genero': row[3], 'editorial': row[4], 'autor': row[5]} for row in rows]
    cursor.close()
    db.close()
    return jsonify(libros), 200


if __name__ == '__main__':
    app.run(debug=True)
