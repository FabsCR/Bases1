-- Segundo proyecto de Bases de Datos 1.
-- Estudiantes: Angelica Harmon Arias, Fabián José Fernández Fernández

-- Instrucción para crear la base de datos
CREATE DATABASE Proyecto_BaseDeDatos1; 
-- Instrucción para seleccionar la base de datos a utilizar
USE Proyecto_BaseDeDatos1;

-- Creaciones de tablas --

CREATE TABLE Persona (
    codigoPersona INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100)
);

CREATE TABLE Editorial (
    Nombre VARCHAR(100) PRIMARY KEY,
    Pais VARCHAR(100)
);

CREATE TABLE Autor (
    IDAutor INT PRIMARY KEY,
    IDPersona INT,
    Editorial_A varchar(100),    
    FOREIGN KEY (IDPersona) REFERENCES Persona(codigoPersona),
    FOREIGN KEY (Editorial_A) REFERENCES Editorial(Nombre)
);

CREATE TABLE Usuario (
    IDUsuario INT PRIMARY KEY,
    IDPersona INT,
    Correo VARCHAR(255),
    telefono int,
    FOREIGN KEY (IDPersona) REFERENCES Persona(codigoPersona)
);

CREATE TABLE Genero (
    Nombre VARCHAR(100) PRIMARY KEY
);

CREATE TABLE Libro (
    IDLibro INT PRIMARY KEY,
    Titulo VARCHAR(255),
    AnioPublicacion INT,
    Genero VARCHAR(100),
    Editorial VARCHAR(100),
    Autor INT,
    FOREIGN KEY (Genero) REFERENCES Genero(Nombre),
    FOREIGN KEY (Editorial) REFERENCES Editorial(Nombre),
    FOREIGN KEY (Autor) REFERENCES Autor(IDAutor)
);

CREATE TABLE Inventario (
    IDLibro INT PRIMARY KEY,
    CantidadLibros INT,
    Status VARCHAR(100),
    FechaAdquisicion DATE,    
    FOREIGN KEY (IDLibro) REFERENCES Libro(IDLibro)
);

CREATE TABLE Prestamo (
    IDPrestamo INT PRIMARY KEY AUTO_INCREMENT,
    IDLibro INT,
    IDUsuario INT,
    FechaPrestamo DATE,
    FechaDevolucion DATE,
    Estado VARCHAR(100),
    FOREIGN KEY (IDLibro) REFERENCES Libro(IDLibro),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);

CREATE TABLE Reserva (
    IDReserva INT PRIMARY KEY AUTO_INCREMENT,
    IDUsuario INT,
    IDLibro INT,
    Status VARCHAR(100),
    ReservacionFecha DATE,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDLibro) REFERENCES Libro(IDLibro)
);

CREATE TABLE Multa (
    IDMulta INT PRIMARY KEY AUTO_INCREMENT,
    IDPrestamo INT,
    Monto DECIMAL(10, 2),
    Estado VARCHAR(100),
    FOREIGN KEY (IDPrestamo) REFERENCES Prestamo(IDPrestamo)
);