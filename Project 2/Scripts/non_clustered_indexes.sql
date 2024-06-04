-- 5 índices no clúster --

-- 1. Índice en la tabla Persona para las columnas Nombre y Apellido
CREATE INDEX idx_persona_nombre_apellido ON Persona (Nombre, Apellido);
SHOW INDEX FROM Persona;

-- 2. Índice en la tabla Editorial para la columna Pais
CREATE INDEX idx_editorial_pais ON Editorial (Pais);
SHOW INDEX FROM Editorial;

-- 3. Índice en la tabla Usuario para la columna Correo
CREATE INDEX idx_usuario_correo ON Usuario (Correo);
SHOW INDEX FROM Usuario;

-- 4. Índice en la tabla Libro para las columnas Titulo y AnioPublicacion
CREATE INDEX idx_libro_titulo_anio ON Libro (Titulo, AnioPublicacion);
SHOW INDEX FROM Libro;

-- 5. Índice en la tabla Prestamo para las columnas IDLibro y IDUsuario
CREATE INDEX idx_prestamo_libro_usuario ON Prestamo (IDLibro, IDUsuario);
SHOW INDEX FROM Prestamo;