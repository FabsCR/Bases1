-- Funciones para insertar, eliminar y actualizar a cada tabla

-- 1. TABLA PERSONA -- 

 -- Insertar en Persona
DELIMITER //

CREATE FUNCTION insert_persona(nombre VARCHAR(100), apellido VARCHAR(100))
RETURNS INT
deterministic	
BEGIN
    INSERT INTO Persona (Nombre, Apellido) VALUES (nombre, apellido);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Persona
CREATE FUNCTION delete_persona(codigo INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Persona WHERE codigoPersona = codigo;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Persona
CREATE FUNCTION update_persona(codigo INT, nombre VARCHAR(100), apellido VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Persona SET Nombre = nombre, Apellido = apellido WHERE codigoPersona = codigo;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 2. TABLA EDITORIAL --

-- Insertar en Editorial
DELIMITER //

CREATE FUNCTION insert_editorial(nombre VARCHAR(100), pais VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    INSERT INTO Editorial (Nombre, Pais) VALUES (nombre, pais);
    RETURN TRUE;
END //

-- Eliminar de Editorial
CREATE FUNCTION delete_editorial(nombre VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Editorial WHERE Nombre = nombre;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Editorial
CREATE FUNCTION update_editorial(nombre VARCHAR(100), pais VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Editorial SET Pais = pais WHERE Nombre = nombre;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 3. TABLA AUTOR --

-- Insertar en Autor
DELIMITER //

CREATE FUNCTION insert_autor(idPersona INT, editorial_A VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Autor (IDPersona, Editorial_A) VALUES (idPersona, editorial_A);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Autor
CREATE FUNCTION delete_autor(idAutor INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Autor WHERE IDAutor = idAutor;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Autor
CREATE FUNCTION update_autor(idAutor INT, idPersona INT, editorial_A VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Autor SET IDPersona = idPersona, Editorial_A = editorial_A WHERE IDAutor = idAutor;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 4. TABLA USUARIO --

-- Insertar en Usuario
DELIMITER //

CREATE FUNCTION insert_usuario(idPersona INT, correo VARCHAR(255), telefono INT)
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Usuario (IDPersona, Correo, telefono) VALUES (idPersona, correo, telefono);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Usuario
CREATE FUNCTION delete_usuario(idUsuario INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Usuario WHERE IDUsuario = idUsuario;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Usuario
CREATE FUNCTION update_usuario(idUsuario INT, idPersona INT, correo VARCHAR(255), telefono INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Usuario SET IDPersona = idPersona, Correo = correo, telefono = telefono WHERE IDUsuario = idUsuario;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 5. TABLA GENERO --

-- Insertar en Genero
DELIMITER //

CREATE FUNCTION insert_genero(nombre VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    INSERT INTO Genero (Nombre) VALUES (nombre);
    RETURN TRUE;
END //

-- Eliminar de Genero
CREATE FUNCTION delete_genero(nombre VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Genero WHERE Nombre = nombre;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Genero
CREATE FUNCTION update_genero(nombre VARCHAR(100), nuevoNombre VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Genero SET Nombre = nuevoNombre WHERE Nombre = nombre;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 6. TABLA LIBRO --

-- Insertar en Libro
DELIMITER //

CREATE FUNCTION insert_libro(titulo VARCHAR(255), anioPublicacion INT, genero VARCHAR(100), editorial VARCHAR(100), autor INT)
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Libro (Titulo, AnioPublicacion, Genero, Editorial, Autor) VALUES (titulo, anioPublicacion, genero, editorial, autor);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Libro
CREATE FUNCTION delete_libro(idLibro INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Libro WHERE IDLibro = idLibro;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Libro
CREATE FUNCTION update_libro(idLibro INT, titulo VARCHAR(255), anioPublicacion INT, genero VARCHAR(100), editorial VARCHAR(100), autor INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Libro SET Titulo = titulo, AnioPublicacion = anioPublicacion, Genero = genero, Editorial = editorial, Autor = autor WHERE IDLibro = idLibro;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 7. TABLA INVENTARIO --

-- Insertar en Inventario
DELIMITER //

CREATE FUNCTION insert_inventario(idLibro INT, cantidadLibros INT, status VARCHAR(100), fechaAdquisicion DATE)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    INSERT INTO Inventario (IDLibro, CantidadLibros, Status, FechaAdquisicion) VALUES (idLibro, cantidadLibros, status, fechaAdquisicion);
    RETURN TRUE;
END //

-- Eliminar de Inventario
CREATE FUNCTION delete_inventario(idLibro INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Inventario WHERE IDLibro = idLibro;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Inventario
CREATE FUNCTION update_inventario(idLibro INT, cantidadLibros INT, status VARCHAR(100), fechaAdquisicion DATE)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Inventario SET CantidadLibros = cantidadLibros, Status = status, FechaAdquisicion = fechaAdquisicion WHERE IDLibro = idLibro;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;
-- 8. TABLA PRESTAMO --

-- Insertar en Prestamo
DELIMITER //

CREATE FUNCTION insert_prestamo(idLibro INT, idUsuario INT, fechaPrestamo DATE, fechaDevolucion DATE, estado VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Prestamo (IDLibro, IDUsuario, FechaPrestamo, FechaDevolucion, Estado) VALUES (idLibro, idUsuario, fechaPrestamo, fechaDevolucion, estado);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Prestamo
CREATE FUNCTION delete_prestamo(idPrestamo INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Prestamo WHERE IDPrestamo = idPrestamo;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Prestamo
CREATE FUNCTION update_prestamo(idPrestamo INT, idLibro INT, idUsuario INT, fechaPrestamo DATE, fechaDevolucion DATE, estado VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Prestamo SET IDLibro = idLibro, IDUsuario = idUsuario, FechaPrestamo = fechaPrestamo, FechaDevolucion = fechaDevolucion, Estado = estado WHERE IDPrestamo = idPrestamo;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 9. TABLA RESERVA --

-- Insertar en Reserva
DELIMITER //

CREATE FUNCTION insert_reserva(idUsuario INT, idLibro INT, status VARCHAR(100), reservacionFecha DATE)
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Reserva (IDUsuario, IDLibro, Status, ReservacionFecha) VALUES (idUsuario, idLibro, status, reservacionFecha);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Reserva
CREATE FUNCTION delete_reserva(idReserva INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Reserva WHERE IDReserva = idReserva;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Reserva
CREATE FUNCTION update_reserva(idReserva INT, idUsuario INT, idLibro INT, status VARCHAR(100), reservacionFecha DATE)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Reserva SET IDUsuario = idUsuario, IDLibro = idLibro, Status = status, ReservacionFecha = reservacionFecha WHERE IDReserva = idReserva;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;

-- 10. TABLA MULTA --

-- Insertar en Multa
DELIMITER //

CREATE FUNCTION insert_multa(idPrestamo INT, monto DECIMAL(10, 2), estado VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    INSERT INTO Multa (IDPrestamo, Monto, Estado) VALUES (idPrestamo, monto, estado);
    RETURN LAST_INSERT_ID();
END //

-- Eliminar de Multa
CREATE FUNCTION delete_multa(idMulta INT)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DELETE FROM Multa WHERE IDMulta = idMulta;
    RETURN ROW_COUNT() > 0;
END //

-- Actualizar Multa
CREATE FUNCTION update_multa(idMulta INT, idPrestamo INT, monto DECIMAL(10, 2), estado VARCHAR(100))
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    UPDATE Multa SET IDPrestamo = idPrestamo, Monto = monto, Estado = estado WHERE IDMulta = idMulta;
    RETURN ROW_COUNT() > 0;
END //

DELIMITER ;