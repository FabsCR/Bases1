-- Reportes -- 

-- Cursores --
-- 1. Reporte de libros con sus géneros y editoriales

DELIMITER //

CREATE PROCEDURE ReporteLibrosGeneroEditorial()
BEGIN
    DECLARE libro_id INT;
    DECLARE libro_titulo VARCHAR(255);
    DECLARE libro_anio_publicacion INT;
    DECLARE genero_nombre VARCHAR(100);
    DECLARE editorial_nombre VARCHAR(100);

    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_libros CURSOR FOR 
        SELECT L.IDLibro, L.Titulo, L.AnioPublicacion, G.Nombre, E.Nombre
        FROM Libro L
        INNER JOIN Genero G ON L.Genero = G.Nombre
        INNER JOIN Editorial E ON L.Editorial = E.Nombre;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_libros;

    fetch_loop: LOOP
        FETCH cur_libros INTO libro_id, libro_titulo, libro_anio_publicacion, genero_nombre, editorial_nombre;
        IF done THEN
            LEAVE fetch_loop;
        END IF;

        SELECT CONCAT('ID Libro: ', libro_id, ', Título: ', libro_titulo, ', Año: ', libro_anio_publicacion, ', Género: ', genero_nombre, ', Editorial: ', editorial_nombre);
    END LOOP;

    CLOSE cur_libros;
END //

DELIMITER ;


-- 2. Reporte de préstamos con información de usuarios y libros

DELIMITER //

CREATE PROCEDURE ReportePrestamosUsuariosLibros()
BEGIN
    DECLARE prestamo_id INT;
    DECLARE libro_titulo VARCHAR(255);
    DECLARE usuario_correo VARCHAR(255);
    DECLARE fecha_prestamo DATE;
    DECLARE fecha_devolucion DATE;
    DECLARE estado VARCHAR(100);

    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_prestamos CURSOR FOR 
        SELECT P.IDPrestamo, L.Titulo, U.Correo, P.FechaPrestamo, P.FechaDevolucion, P.Estado
        FROM Prestamo P
        INNER JOIN Libro L ON P.IDLibro = L.IDLibro
        INNER JOIN Usuario U ON P.IDUsuario = U.IDUsuario;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_prestamos;

    fetch_loop: LOOP
        FETCH cur_prestamos INTO prestamo_id, libro_titulo, usuario_correo, fecha_prestamo, fecha_devolucion, estado;
        IF done THEN
            LEAVE fetch_loop;
        END IF;

        SELECT CONCAT('ID Préstamo: ', prestamo_id, ', Libro: ', libro_titulo, ', Usuario: ', usuario_correo, ', Fecha Préstamo: ', fecha_prestamo, ', Fecha Devolución: ', fecha_devolucion, ', Estado: ', estado);
    END LOOP;

    CLOSE cur_prestamos;
END //

DELIMITER ;


-- 3. Reporte de inventario con información de libros y estado de inventario

DELIMITER //

CREATE PROCEDURE ReporteInventarioLibros()
BEGIN
    DECLARE inventario_id INT;
    DECLARE libro_titulo VARCHAR(255);
    DECLARE cantidad_libros INT;
    DECLARE status VARCHAR(100);
    DECLARE fecha_adquisicion DATE;
    DECLARE editorial_nombre VARCHAR(100);

    DECLARE done INT DEFAULT FALSE;
    DECLARE cur_inventario CURSOR FOR 
        SELECT I.IDLibro, L.Titulo, I.CantidadLibros, I.Status, I.FechaAdquisicion, E.Nombre
        FROM Inventario I
        INNER JOIN Libro L ON I.IDLibro = L.IDLibro
        INNER JOIN Editorial E ON L.Editorial = E.Nombre;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur_inventario;

    fetch_loop: LOOP
        FETCH cur_inventario INTO inventario_id, libro_titulo, cantidad_libros, status, fecha_adquisicion, editorial_nombre;
        IF done THEN
            LEAVE fetch_loop;
        END IF;

        SELECT CONCAT('ID Inventario: ', inventario_id, ', Libro: ', libro_titulo, ', Cantidad: ', cantidad_libros, ', Status: ', status, ', Fecha Adquisición: ', fecha_adquisicion, ', Editorial: ', editorial_nombre);
    END LOOP;

    CLOSE cur_inventario;
END //

DELIMITER ;

-- Generación de Reportes utilizando Cursores --

CALL ReporteLibrosGeneroEditorial();
CALL ReportePrestamosUsuariosLibros();
CALL ReporteInventarioLibros();