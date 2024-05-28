-- Insertar datos -- 


-- Datos de prueba para la tabla Persona
INSERT INTO Persona (Nombre, Apellido) VALUES
('Juan', 'González'),
('María', 'Martínez'),
('Carlos', 'López'),
('Ana', 'Hernández'),
('Laura', 'Gómez'),
('Pedro', 'Díaz'),
('Carolina', 'Vargas'),
('Miguel', 'Sánchez'),
('Sofía', 'Luna'),
('Santiago', 'López'), 
('Ana', 'Martínez'), -- 11 
('Roberto', 'García'), 
('María', 'Rodríguez'), 
('Carlos', 'Pérez'), 
('Laura', 'Hernández'), 
('Javier', 'González'), 
('Paula', 'Díaz'), 
('Luis', 'Fernández'),
('Andrea', 'Ramírez'), 
('Diego', 'Rodríguez'); 

-- Datos de prueba para la tabla Editorial
INSERT INTO Editorial (Nombre, Pais) VALUES
('Editorial Costa Rica', 'Costa Rica'),
('Editorial Universitaria', 'Costa Rica'),
('Ediciones Tiquicia', 'Costa Rica'),
('Editorial Nacional', 'Costa Rica'),
('Editorial del Sol', 'Costa Rica'),
('Ediciones Costarricenses', 'Costa Rica'),
('Editorial Catedral', 'Costa Rica'),
('Imprenta Nacional', 'Costa Rica'),
('Editorial UCR', 'Costa Rica'),
('Imprenta La Paz', 'Costa Rica');

-- Datos de prueba para la tabla Autor
INSERT INTO Autor (IDAutor, IDPersona, Editorial_A) VALUES
(1, 1, 'Editorial Costa Rica'),
(2, 2, 'Editorial Universitaria'),
(3, 3, 'Ediciones Tiquicia'),
(4, 4, 'Editorial Nacional'),
(6, 6, 'Editorial del Sol'),
(7, 7, 'Ediciones Costarricenses'),
(8, 8, 'Editorial Catedral'),
(9, 9, 'Imprenta Nacional'),
(10, 10, 'Editorial UCR'),
(5, 5, 'Imprenta La Paz');

-- Datos de prueba para la tabla Usuario
INSERT INTO Usuario (IDUsuario, IDPersona, Correo, telefono) VALUES
(1, 11, 'Ana@example.com', 12345678),
(2, 12, 'Roberto@example.com', 98765432),
(3, 13, 'María@example.com', 54321678),
(4, 14, 'Carlos@example.com', 87654321),
(6, 16, 'laura@example.com', 13579246),
(7, 17, 'Javier@example.com', 24681357),
(8, 18, 'paula@example.com', 35792468),
(9, 19, 'luis@example.com', 46813579),
(10, 20, 'andrea@example.com', 57924681),
(5, 15, 'luisak7@example.com', 23456789);

-- Datos de prueba para la tabla Genero
INSERT INTO Genero (Nombre) VALUES
('Ficción'),
('No Ficción'),
('Terror'),
('Misterio'),
('Romance'),
('Aventura'),
('Fantasía'),
('Histórico'),
('Infantil'),
('Ciencia Ficción'),
('Drama'),
('Crimen');

-- Datos de prueba para la tabla Libro
INSERT INTO Libro (IDLibro, Titulo, AnioPublicacion, Genero, Editorial, Autor) VALUES
(1, 'Cien años de soledad', 1967, 'Ficción', 'Editorial Costa Rica', 1),
(2, 'La ciudad y los perros', 1963, 'Ficción', 'Editorial Universitaria', 2),
(3, 'Historia de una escalera', 1949, 'Drama', 'Ediciones Tiquicia', 3),
(4, 'La casa de los espíritus', 1982, 'Ficción', 'Editorial Nacional', 4),
(6, 'Orgullo y prejuicio', 1813, 'Romance', 'Editorial del Sol', 6),
(7, 'La isla del tesoro', 1883, 'Aventura', 'Ediciones Costarricenses', 7),
(8, 'El señor de los anillos', 1954, 'Fantasía', 'Editorial Catedral', 8),
(9, 'Los miserables', 1862, 'Histórico', 'Imprenta Nacional', 9),
(10, 'Alicia en el país de las maravillas', 1865, 'Infantil', 'Editorial UCR', 10),
(5, 'Cien años de perdón', 2013, 'Crimen', 'Imprenta La Paz', 5);

-- Datos de prueba para la tabla Inventario
INSERT INTO Inventario (IDLibro, CantidadLibros, Status, FechaAdquisicion) VALUES
(1, 5, 'Disponible', '2024-04-01'),
(2, 3, 'Disponible', '2024-04-05'),
(3, 8, 'Disponible', '2024-03-20'),
(4, 2, 'Prestado', '2024-04-10'),
(6, 6, 'Disponible', '2024-04-03'),
(7, 7, 'Disponible', '2024-04-05'),
(8, 8, 'Disponible', '2024-04-07'),
(9, 9, 'Prestado', '2024-04-09'),
(10, 10, 'Disponible', '2024-04-11'),
(5, 10, 'Disponible', '2024-04-02');

-- Datos de prueba para la tabla Prestamo
INSERT INTO Prestamo (IDLibro, IDUsuario, FechaPrestamo, FechaDevolucion, Estado) VALUES
(1, 1, '2024-04-02', '2024-04-09', 'Devuelto'),
(2, 2, '2024-04-03', '2024-04-10', 'Devuelto'),
(3, 3, '2024-04-05', '2024-04-12', 'Pendiente'),
(4, 4, '2024-04-07', '2024-04-13', 'Prestado'),
(6, 6, '2024-04-04', '2024-04-11', 'Devuelto'),
(7, 7, '2024-04-06', '2024-04-13', 'Devuelto'),
(8, 8, '2024-04-08', '2024-04-15', 'Pendiente'),
(9, 9, '2024-04-10', '2024-04-12', 'Prestado'),
(10, 10, '2024-04-12', '2024-04-16', 'Prestado'),
(5, 5, '2024-04-09', '2024-04-22', 'Prestado');

-- Datos de prueba para la tabla Reserva
INSERT INTO Reserva (IDUsuario, IDLibro, Status, ReservacionFecha) VALUES
(1, 3, 'Pendiente', '2024-04-05'),
(2, 4, 'Pendiente', '2024-04-07'),
(3, 5, 'Pendiente', '2024-04-10'),
(4, 1, 'Pendiente', '2024-04-12'),
(6, 8, 'Pendiente', '2024-04-08'),
(7, 9, 'Pendiente', '2024-04-10'),
(8, 10, 'Pendiente', '2024-04-12'),
(9, 6, 'Pendiente', '2024-04-14'),
(10, 7, 'Pendiente', '2024-04-15'),
(5, 2, 'Pendiente', '2024-04-15');

-- Datos de prueba para la tabla Multa
INSERT INTO Multa (IDPrestamo, Monto, Estado) VALUES
(1, 5000.00, 'Pagada'),
(2, 7500.00, 'Pendiente'),
(3, 0.00, 'Sin multa'),
(4, 10000.00, 'Pagada'),
(6, 0.00, 'Sin multa'),
(7, 0.00, 'Sin multa'),
(8, 2500.00, 'Pendiente'),
(9, 0.00, 'Sin multa'),
(10, 5000.00, 'Pagada'),
(5, 0.00, 'Sin multa'); 