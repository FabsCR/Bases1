-- Usuarios con los permisos específicos

-- 1. Crear un Usuario Administrador con Permisos de Súper Usuario --

-- Crear el usuario administrador
CREATE USER 'admin_user'@'localhost' IDENTIFIED BY 'UsuarioAdministrador123';

-- Otorgar permisos de súper usuario al usuario administrador
GRANT ALL PRIVILEGES ON *.* TO 'admin_user'@'localhost' WITH GRANT OPTION;

-- Aplicar los cambios
FLUSH PRIVILEGES;

-- 2. Crear un Usuario Normal con Acceso Solo a Tablas y Funciones --

-- Crear el usuario normal
CREATE USER 'normal_user'@'localhost' IDENTIFIED BY 'UsuarioNomal123';

-- Otorgar permisos de acceso a las tablas y funciones al usuario normal
GRANT SELECT, INSERT, UPDATE, DELETE ON `proyecto_basededatos1`.* TO 'normal_user'@'localhost';
GRANT EXECUTE ON FUNCTION `proyecto_basededatos1`.* TO 'normal_user'@'localhost';

-- Aplicar los cambios
FLUSH PRIVILEGES;


-- 3. Crear un Usuario Respaldo con Permisos para Realizar Respaldo de Base de Datos -- 

-- Crear el usuario respaldo
CREATE USER 'backup_user'@'localhost' IDENTIFIED BY 'UsuarioBackup123';

-- Otorgar permisos de respaldo de base de datos al usuario respaldo
GRANT SELECT, LOCK TABLES, SHOW VIEW, EVENT, TRIGGER ON `proyecto_basededatos1`.* TO 'backup_user'@'localhost';

-- Aplicar los cambios
FLUSH PRIVILEGES;