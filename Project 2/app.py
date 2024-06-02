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

# Función para manejar errores
def handle_error(e):
    return jsonify({'error': str(e)}), 500

# Rutas Persona
@app.route('/persona', methods=['POST'])
def create_persona():
    try:
        db = get_db_connection()
        nombre = request.json.get('nombre')
        apellido = request.json.get('apellido')
        if not nombre or not apellido:
            return jsonify({'error': 'Nombre y apellido son campos requeridos'}), 400
        cursor = db.cursor()
        cursor.execute("SELECT insert_persona(%s, %s)", (nombre, apellido))
        db.commit()
        persona_id = cursor.fetchone()[0]
        cursor.close()
        db.close()
        return jsonify({'id': persona_id}), 201
    except Exception as e:
        return handle_error(e)

@app.route('/persona/<int:codigo>', methods=['DELETE'])
def delete_persona(codigo):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT delete_persona(%s)", (codigo,))
        db.commit()
        result = cursor.fetchone()[0]
        cursor.close()
        db.close()
        return jsonify({'deleted': result}), 200
    except Exception as e:
        return handle_error(e)

@app.route('/persona/<int:codigo>', methods=['PUT'])
def update_persona(codigo):
    try:
        db = get_db_connection()
        nombre = request.json.get('nombre')
        apellido = request.json.get('apellido')
        if not nombre or not apellido:
            return jsonify({'error': 'Nombre y apellido son campos requeridos'}), 400
        cursor = db.cursor()
        cursor.execute("SELECT update_persona(%s, %s, %s)", (codigo, nombre, apellido))
        db.commit()
        result = cursor.fetchone()[0]
        cursor.close()
        db.close()
        return jsonify({'updated': result}), 200
    except Exception as e:
        return handle_error(e)

@app.route('/persona', methods=['GET'])
def get_personas():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Persona")
        rows = cursor.fetchall()
        personas = [{'codigoPersona': row[0], 'nombre': row[1], 'apellido': row[2]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(personas), 200
    except Exception as e:
        return handle_error(e)


# Rutas Editorial
@app.route('/editorial', methods=['POST'])
def create_editorial():
    try:
        db = get_db_connection()
        nombre = request.json.get('nombre')
        pais = request.json.get('pais')
        if not nombre or not pais:
            return jsonify({'error': 'Nombre y país son campos requeridos'}), 400
        cursor = db.cursor()
        cursor.execute("SELECT insert_editorial(%s, %s)", (nombre, pais))
        db.commit()
        cursor.close()
        db.close()
        return jsonify({'message': 'Editorial creada'}), 201
    except Exception as e:
        return handle_error(e)

@app.route('/editorial/<string:nombre>', methods=['DELETE'])
def delete_editorial(nombre):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM autor WHERE Editorial_A = %s", (nombre,))
            db.commit()
            cursor.execute("DELETE FROM editorial WHERE Nombre = %s", (nombre,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'deleted': True}), 200
        except MySQLdb.IntegrityError as e:
            db.rollback()
            return jsonify({'error': str(e)}), 400
    except Exception as e:
        return handle_error(e)

@app.route('/editorial/<string:nombre>', methods=['PUT'])
def update_editorial(nombre):
    try:
        db = get_db_connection()
        pais = request.json.get('pais')
        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Editorial SET Pais = %s WHERE Nombre = %s", (pais, nombre))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'updated': True}), 200
        except MySQLdb.IntegrityError as e:
            db.rollback()
            return jsonify({'error': str(e)}), 400
    except Exception as e:
        return handle_error(e)


@app.route('/editorial', methods=['GET'])
def get_editoriales():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Editorial")
        rows = cursor.fetchall()
        editoriales = [{'nombre': row[0], 'pais': row[1]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(editoriales), 200
    except Exception as e:
        return handle_error(e)


# Rutas Autor
@app.route('/autor', methods=['POST'])
def create_autor():
    try:
        db = get_db_connection()
        id_persona = request.json.get('id_persona')
        editorial = request.json.get('editorial')
        if not id_persona or not editorial:
            return jsonify({'error': 'ID de persona y editorial son campos requeridos'}), 400
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Autor (IDPersona, Editorial_A) VALUES (%s, %s)", (id_persona, editorial))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Autor creado'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/autor/<int:id_autor>', methods=['DELETE'])
def delete_autor(id_autor):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("SELECT IDAutor FROM Autor WHERE IDAutor = %s", (id_autor,))
            if not cursor.fetchone():
                return jsonify({'error': f'El autor con ID {id_autor} no existe'}), 404
            cursor.execute("DELETE FROM Autor WHERE IDAutor = %s", (id_autor,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': f'Autor con ID {id_autor} eliminado correctamente'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/autor/<int:id_autor>', methods=['PUT'])
def update_autor(id_autor):
    try:
        db = get_db_connection()
        id_persona = request.json.get('id_persona')
        editorial = request.json.get('editorial')
        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Autor SET IDPersona = %s, Editorial_A = %s WHERE IDAutor = %s", (id_persona, editorial, id_autor))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'updated': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/autor', methods=['GET'])
def get_autores():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Autor")
        rows = cursor.fetchall()
        autores = [{'id_autor': row[0], 'id_persona': row[1], 'editorial': row[2]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(autores), 200
    except Exception as e:
        return handle_error(e)

# Rutas Usuario
@app.route('/usuario', methods=['POST'])
def create_usuario():
    try:
        db = get_db_connection()
        id_persona = request.json.get('id_persona')
        correo = request.json.get('correo')
        telefono = request.json.get('telefono')
        if not id_persona or not correo or not telefono:
            return jsonify({'error': 'ID de persona, correo y teléfono son campos requeridos'}), 400
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Usuario (IDPersona, Correo, telefono) VALUES (%s, %s, %s)", (id_persona, correo, telefono))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Usuario creado'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/usuario/<int:id_usuario>', methods=['DELETE'])
def delete_usuario(id_usuario):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Usuario WHERE IDUsuario = %s", (id_usuario,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'deleted': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/usuario/<int:id_usuario>', methods=['PUT'])
def update_usuario(id_usuario):
    try:
        db = get_db_connection()
        id_persona = request.json.get('id_persona')
        correo = request.json.get('correo')
        telefono = request.json.get('telefono')
        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Usuario SET IDPersona = %s, Correo = %s, telefono = %s WHERE IDUsuario = %s", (id_persona, correo, telefono, id_usuario))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'updated': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/usuario', methods=['GET'])
def get_usuarios():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario")
        rows = cursor.fetchall()
        usuarios = [{'id_usuario': row[0], 'id_persona': row[1], 'correo': row[2], 'telefono': row[3]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(usuarios), 200
    except Exception as e:
        return handle_error(e)


# Rutas Genero

@app.route('/genero', methods=['POST'])
def create_genero():
    try:
        db = get_db_connection()
        nombre = request.json.get('nombre')
        if not nombre:
            return jsonify({'error': 'El nombre del género es un campo requerido'}), 400
        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Genero (Nombre) VALUES (%s)", (nombre,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Género creado'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/genero/<string:nombre>', methods=['DELETE'])
def delete_genero(nombre):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Genero WHERE Nombre = %s", (nombre,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'deleted': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/genero/<string:nombre>', methods=['PUT'])
def update_genero(nombre):
    try:
        db = get_db_connection()
        nuevo_nombre = request.json.get('nombre')
        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Genero SET Nombre = %s WHERE Nombre = %s", (nuevo_nombre, nombre))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'updated': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/genero', methods=['GET'])
def get_generos():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Genero")
        rows = cursor.fetchall()
        generos = [{'nombre': row[0]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(generos), 200
    except Exception as e:
        return handle_error(e)


# Rutas Libro

@app.route('/libro', methods=['POST'])
def create_libro():
    try:
        db = get_db_connection()
        data = request.json
        titulo = data.get('titulo')
        anio_publicacion = data.get('anio_publicacion')
        genero = data.get('genero')
        editorial = data.get('editorial')
        autor = data.get('autor')

        if not all([titulo, anio_publicacion, genero, editorial, autor]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Editorial, Autor) VALUES (%s, %s, %s, %s, %s)", (titulo, anio_publicacion, genero, editorial, autor))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Libro creado'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/libro/<int:id_libro>', methods=['DELETE'])
def delete_libro(id_libro):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Libro WHERE IDLibro = %s", (id_libro,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'deleted': True}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/libro/<int:id_libro>', methods=['PUT'])
def update_libro(id_libro):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        data = request.json
        titulo = data.get('titulo')
        anio_publicacion = data.get('anio_publicacion')
        genero = data.get('genero')
        editorial = data.get('editorial')
        autor = data.get('autor')

        if not all([titulo, anio_publicacion, genero, editorial, autor]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        try:
            cursor.execute("UPDATE Libro SET Titulo = %s, AnioPublicacion = %s, Genero = %s, Editorial = %s, Autor = %s WHERE IDLibro = %s", (titulo, anio_publicacion, genero, editorial, autor, id_libro))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Libro actualizado correctamente'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/libro', methods=['GET'])
def get_libros():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Libro")
        rows = cursor.fetchall()
        libros = [{'id_libro': row[0], 'titulo': row[1], 'anio_publicacion': row[2], 'genero': row[3], 'editorial': row[4], 'autor': row[5]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(libros), 200
    except Exception as e:
        return handle_error(e)


# Rutas Inventario

@app.route('/inventario', methods=['POST'])
def create_inventario():
    try:
        db = get_db_connection()
        data = request.json
        id_libro = data.get('id_libro')
        cantidad_libros = data.get('cantidad_libros')
        status = data.get('status')
        fecha_adquisicion = data.get('fecha_adquisicion')

        if not all([id_libro, cantidad_libros, status, fecha_adquisicion]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Inventario (IDLibro, CantidadLibros, Status, FechaAdquisicion) VALUES (%s, %s, %s, %s)", (id_libro, cantidad_libros, status, fecha_adquisicion))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Registro de inventario creado correctamente'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/inventario', methods=['GET'])
def get_inventario():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Inventario")
        rows = cursor.fetchall()
        inventario = [{'id_libro': row[0], 'cantidad_libros': row[1], 'status': row[2], 'fecha_adquisicion': row[3]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(inventario), 200
    except Exception as e:
        return handle_error(e)

@app.route('/inventario/<int:id_libro>', methods=['PUT'])
def update_inventario(id_libro):
    try:
        db = get_db_connection()
        data = request.json
        cantidad_libros = data.get('cantidad_libros')
        status = data.get('status')
        fecha_adquisicion = data.get('fecha_adquisicion')

        if not all([cantidad_libros, status, fecha_adquisicion]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Inventario SET CantidadLibros = %s, Status = %s, FechaAdquisicion = %s WHERE IDLibro = %s", (cantidad_libros, status, fecha_adquisicion, id_libro))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Registro de inventario actualizado correctamente'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/inventario/<int:id_libro>', methods=['DELETE'])
def delete_inventario(id_libro):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Inventario WHERE IDLibro = %s", (id_libro,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Registro de inventario eliminado correctamente'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)


# Rutas Prestamo

@app.route('/prestamo', methods=['POST'])
def create_prestamo():
    try:
        db = get_db_connection()
        data = request.json
        id_libro = data.get('id_libro')
        id_usuario = data.get('id_usuario')
        fecha_prestamo = data.get('fecha_prestamo')
        fecha_devolucion = data.get('fecha_devolucion')
        estado = data.get('estado')

        if not all([id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Prestamo (IDLibro, IDUsuario, FechaPrestamo, FechaDevolucion, Estado) VALUES (%s, %s, %s, %s, %s)", (id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Préstamo creado'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/prestamo', methods=['GET'])
def get_prestamos():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Prestamo")
        rows = cursor.fetchall()
        prestamos = [{'id_prestamo': row[0], 'id_libro': row[1], 'id_usuario': row[2], 'fecha_prestamo': row[3], 'fecha_devolucion': row[4], 'estado': row[5]} for row in rows]
        cursor.close()
        db.close()
        return jsonify(prestamos), 200
    except Exception as e:
        return handle_error(e)

@app.route('/prestamo/<int:id_prestamo>', methods=['PUT'])
def update_prestamo(id_prestamo):
    try:
        db = get_db_connection()
        data = request.json
        id_libro = data.get('id_libro')
        id_usuario = data.get('id_usuario')
        fecha_prestamo = data.get('fecha_prestamo')
        fecha_devolucion = data.get('fecha_devolucion')
        estado = data.get('estado')

        if not all([id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Prestamo SET IDLibro = %s, IDUsuario = %s, FechaPrestamo = %s, FechaDevolucion = %s, Estado = %s WHERE IDPrestamo = %s", (id_libro, id_usuario, fecha_prestamo, fecha_devolucion, estado, id_prestamo))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Préstamo actualizado'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/prestamo/<int:id_prestamo>', methods=['DELETE'])
def delete_prestamo(id_prestamo):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Prestamo WHERE IDPrestamo = %s", (id_prestamo,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Préstamo eliminado'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)



# Rutas Reserva

@app.route('/reserva', methods=['POST'])
def create_reserva():
    try:
        db = get_db_connection()
        data = request.json
        id_usuario = data.get('id_usuario')
        id_libro = data.get('id_libro')
        status = data.get('status')
        reservacion_fecha = data.get('reservacion_fecha')

        if not all([id_usuario, id_libro, status, reservacion_fecha]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Reserva (IDUsuario, IDLibro, Status, ReservacionFecha) VALUES (%s, %s, %s, %s)", (id_usuario, id_libro, status, reservacion_fecha))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Reserva creada'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/reserva', methods=['GET'])
def get_reservas():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Reserva")
        reservas = [{'IDReserva': row[0], 'IDUsuario': row[1], 'IDLibro': row[2], 'Status': row[3], 'ReservacionFecha': row[4]} for row in cursor.fetchall()]
        cursor.close()
        db.close()
        return jsonify(reservas), 200
    except Exception as e:
        return handle_error(e)

@app.route('/reserva/<int:id_reserva>', methods=['PUT'])
def update_reserva(id_reserva):
    try:
        db = get_db_connection()
        data = request.json
        status = data.get('status')
        reservacion_fecha = data.get('reservacion_fecha')

        if not all([status, reservacion_fecha]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Reserva SET Status = %s, ReservacionFecha = %s WHERE IDReserva = %s", (status, reservacion_fecha, id_reserva))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Reserva actualizada'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/reserva/<int:id_reserva>', methods=['DELETE'])
def delete_reserva(id_reserva):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Reserva WHERE IDReserva = %s", (id_reserva,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Reserva eliminada'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)


# Rutas Multa

@app.route('/multa', methods=['POST'])
def create_multa():
    try:
        db = get_db_connection()
        data = request.json
        id_prestamo = data.get('id_prestamo')
        monto = data.get('monto')
        estado = data.get('estado')

        if not all([id_prestamo, monto, estado]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("INSERT INTO Multa (IDPrestamo, Monto, Estado) VALUES (%s, %s, %s)", (id_prestamo, monto, estado))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Multa creada'}), 201
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/multa', methods=['GET'])
def get_multas():
    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Multa")
        multas = [{'IDMulta': row[0], 'IDPrestamo': row[1], 'Monto': row[2], 'Estado': row[3]} for row in cursor.fetchall()]
        cursor.close()
        db.close()
        return jsonify(multas), 200
    except Exception as e:
        return handle_error(e)

@app.route('/multa/<int:id_multa>', methods=['PUT'])
def update_multa(id_multa):
    try:
        db = get_db_connection()
        data = request.json
        monto = data.get('monto')
        estado = data.get('estado')

        if not all([monto, estado]):
            return jsonify({'error': 'Todos los campos son requeridos'}), 400

        cursor = db.cursor()
        try:
            cursor.execute("UPDATE Multa SET Monto = %s, Estado = %s WHERE IDMulta = %s", (monto, estado, id_multa))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Multa actualizada'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)

@app.route('/multa/<int:id_multa>', methods=['DELETE'])
def delete_multa(id_multa):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        try:
            cursor.execute("DELETE FROM Multa WHERE IDMulta = %s", (id_multa,))
            db.commit()
            cursor.close()
            db.close()
            return jsonify({'message': 'Multa eliminada'}), 200
        except Exception as e:
            db.rollback()
            return handle_error(e)
    except Exception as e:
        return handle_error(e)


if __name__ == '__main__':
    app.run(debug=True)
