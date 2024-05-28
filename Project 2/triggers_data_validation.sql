-- Triggers en 4 tablas para verificar la validez de los valores ingresados 
-- al insertar, eliminar y al actualizar.

-- Trigger para la tabla Persona
DELIMITER //

CREATE TRIGGER persona_before_insert
BEFORE INSERT ON Persona
FOR EACH ROW
BEGIN
    -- Verificar que el nombre y apellido no estén vacíos
    IF NEW.Nombre = '' OR NEW.Apellido = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El nombre y apellido no pueden estar vacíos';
    END IF;
END //

CREATE TRIGGER persona_before_update
BEFORE UPDATE ON Persona
FOR EACH ROW
BEGIN
    -- Verificar que el nombre y apellido no estén vacíos
    IF NEW.Nombre = '' OR NEW.Apellido = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El nombre y apellido no pueden estar vacíos';
    END IF;
END //

DELIMITER ;

-- Trigger para la tabla Editorial
DELIMITER //

CREATE TRIGGER editorial_before_insert
BEFORE INSERT ON Editorial
FOR EACH ROW
BEGIN
    -- Verificar que el nombre de la editorial no esté vacío
    IF NEW.Nombre = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El nombre de la editorial no puede estar vacío';
    END IF;
END //

CREATE TRIGGER editorial_before_update
BEFORE UPDATE ON Editorial
FOR EACH ROW
BEGIN
    -- Verificar que el nombre de la editorial no esté vacío
    IF NEW.Nombre = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El nombre de la editorial no puede estar vacío';
    END IF;
END //

DELIMITER ;

-- Trigger para la tabla Autor
DELIMITER //

CREATE TRIGGER autor_before_insert
BEFORE INSERT ON Autor
FOR EACH ROW
BEGIN
    -- Verificar que el ID de la persona y la editorial no sean nulos
    IF NEW.IDPersona IS NULL OR NEW.Editorial_A = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El ID de la persona y la editorial no pueden ser nulos';
    END IF;
END //

CREATE TRIGGER autor_before_update
BEFORE UPDATE ON Autor
FOR EACH ROW
BEGIN
    -- Verificar que el ID de la persona y la editorial no sean nulos
    IF NEW.IDPersona IS NULL OR NEW.Editorial_A = '' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El ID de la persona y la editorial no pueden ser nulos';
    END IF;
END //

DELIMITER ;

-- Trigger para la tabla Usuario
DELIMITER //

CREATE TRIGGER usuario_before_insert
BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    -- Verificar que el ID de la persona no sea nulo
    IF NEW.IDPersona IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El ID de la persona no puede ser nulo';
    END IF;
END //

CREATE TRIGGER usuario_before_update
BEFORE UPDATE ON Usuario
FOR EACH ROW
BEGIN
    -- Verificar que el ID de la persona no sea nulo
    IF NEW.IDPersona IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El ID de la persona no puede ser nulo';
    END IF;
END //

DELIMITER ;