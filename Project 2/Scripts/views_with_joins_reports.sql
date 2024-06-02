-- 5 vistas que contienen 6 columnas y 2 joins
-- con otras tablas para la generacion de reportes

-- Vista 1: Reporte de libros con información de género, editorial y autor
CREATE VIEW ReporteLibros AS
SELECT L.IDLibro, L.Titulo, L.AnioPublicacion, G.Nombre AS Genero, E.Nombre AS Editorial, CONCAT(P.Nombre, ' ', P.Apellido) AS Autor
FROM Libro L
INNER JOIN Genero G ON L.Genero = G.Nombre
INNER JOIN Editorial E ON L.Editorial = E.Nombre
INNER JOIN Autor A ON L.Autor = A.IDAutor
INNER JOIN Persona P ON A.IDPersona = P.codigoPersona;

-- Vista 2: Reporte de préstamos con información de libros, usuarios y estado
CREATE VIEW ReportePrestamos AS
SELECT P.IDPrestamo, L.Titulo AS TituloLibro, CONCAT(U.Correo, ' (', U.telefono, ')') AS Usuario, P.FechaPrestamo, P.FechaDevolucion, P.Estado
FROM Prestamo P
INNER JOIN Libro L ON P.IDLibro = L.IDLibro
INNER JOIN Usuario U ON P.IDUsuario = U.IDUsuario;

-- Vista 3: Reporte de inventario con información de libros y estado
CREATE VIEW ReporteInventario AS
SELECT I.IDLibro, L.Titulo AS TituloLibro, I.CantidadLibros, I.Status, I.FechaAdquisicion, E.Nombre AS Editorial
FROM Inventario I
INNER JOIN Libro L ON I.IDLibro = L.IDLibro
INNER JOIN Editorial E ON L.Editorial = E.Nombre;

-- Vista 4: Reporte de usuarios con información de libros reservados y fecha de reserva
CREATE VIEW ReporteUsuarios AS
SELECT U.IDUsuario, CONCAT(U.Correo, ' (', U.telefono, ')') AS Usuario, R.IDReserva, R.ReservacionFecha, L.Titulo AS TituloLibro, R.Status
FROM Usuario U
INNER JOIN Reserva R ON U.IDUsuario = R.IDUsuario
INNER JOIN Libro L ON R.IDLibro = L.IDLibro;

-- Vista 5: Reporte de multas con información de préstamos y estado
CREATE VIEW ReporteMultas AS
SELECT M.IDMulta, P.IDPrestamo, L.Titulo AS TituloLibro, CONCAT(U.Correo, ' (', U.telefono, ')') AS Usuario, M.Monto, M.Estado
FROM Multa M
INNER JOIN Prestamo P ON M.IDPrestamo = P.IDPrestamo
INNER JOIN Libro L ON P.IDLibro = L.IDLibro
INNER JOIN Usuario U ON P.IDUsuario = U.IDUsuario;