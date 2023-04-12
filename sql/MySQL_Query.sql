-- crear base de datos -----------------------------------------------------------------------
CREATE SCHEMA `kartax`;

SELECT * FROM usuario;
SELECT * FROM color;
SELECT * FROM rol;

-- usuarios ----------------------------------------------------------------------------------
CREATE TABLE `kartax`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombres` VARCHAR(100) NOT NULL,
  `apellidos` VARCHAR(100) NOT NULL,
  `usuario` VARCHAR(50) NOT NULL,
  `clave` VARCHAR(255) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,  
  `isActive` BIT(1) NOT NULL,
  `id_rol` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_set`(
	inNombres VARCHAR(100),
    inApellidos VARCHAR(100),
    inUsuario VARCHAR(50),
    inClave VARCHAR(255),
    inCorreo VARCHAR(100),
    inIdRol INT
)
BEGIN
	SET @cont = 0;
    SET @isActive = FALSE;
    SET @msge = "";
    
    SET inClave = SHA1(inClave);
    
    SET @cont := 
    (SELECT 
		COUNT(id) 
    FROM usuario a 
    WHERE a.usuario = usuario);
    
    IF (@cont = 0) THEN
		INSERT INTO usuario 
			(nombres, apellidos, usuario, clave, correo, isActive, id_rol)
		VALUES
			(inNombres, inApellidos, inUsuario, inClave, inCorreo, TRUE, inIdRol);
        
		SET @isActive = TRUE;
        SET @msge = "Usuario Registrado Correctamente";
	ELSE
		SET @isActive = FALSE;
        SET @msge = "Usuario ya Existe";
    END IF;
    
    SELECT @isActive AS isActive, @msge AS msge;
END;

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_get`(
	inUsuario VARCHAR(50),
    inClave VARCHAR(255)
)
BEGIN
    SET @cont = 0;
    SET @isActive = FALSE;
    SET @msge = "";
    
    SET inClave = SHA1(inClave);
    
    SET @cont := 
	(SELECT 
		COUNT(id) 
	FROM usuario 
	WHERE 
		usuario = inUsuario AND 
        clave = inClave AND
		isActive = 1);
		
	IF  @cont > 0 THEN
		SET @isActive = TRUE;
	ELSE
		SET @msge = "Usuario o Contraseña Incorrecta";
	END IF;
    
    SELECT @isActive AS isActive, @msge AS msge;
END;

SELECT * FROM usuario;
-- TRUNCATE TABLE usuario;
CALL sp_usuario_get("NEFELIN", "123456");
CALL sp_usuario_get("NEFELIN", "1234561");
CALL sp_usuario_set("FRANCISCO", "CARMONA", "NEFELIN", 123456, "n@n.cl", 1);

SELECT SHA1('123456') AS Pass;
SELECT SHA1(123456) AS Pass;

-- rol usuario -------------------------------------------------------------------------------
CREATE TABLE `kartax`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO rol (nombre) 
VALUES 
	('Admin Sistema'),
	('Admin'),
    ('Usuario'),
    ('cliente');

ALTER TABLE `kartax`.`usuario` 
ADD INDEX `FK_Usuario_Rol_idx` (`id_rol` ASC) VISIBLE;
ALTER TABLE `kartax`.`usuario` 
ADD CONSTRAINT `FK_Usuario_Rol`
  FOREIGN KEY (`id_rol`)
  REFERENCES `kartax`.`rol` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- -------------------------------------------------------------------------------------------
CREATE TABLE `kartax`.`color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  `R` INT NOT NULL,
  `G` INT NOT NULL,
  `B` INT NOT NULL,
  `id_Negocio` INT NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO color (nombre, R, G, B, id_Negocio) 
VALUES 
	('colorBase01', 0, 0, 0, 1),
	('colorBase02', 255, 255, 255, 1),
	('colorBase03', 102, 102, 102, 1),
	('color01', 32, 148, 243, 1),
	('color02', 190, 0, 29, 1),
	('color03', 252, 161, 32, 1),
	('color04', 0, 255, 255, 1);
    
-- comanda -----------------------------------------------------------------------------------
CREATE TABLE `kartax`.`comanda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `isActive` BIT NOT NULL,
  `id_Mesa` INT NOT NULL,
  `id_Negocio` INT NOT NULL,
  PRIMARY KEY (`in`));

CREATE TABLE `kartax`.`comanda_deta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `id_Item` INT NOT NULL,
  `id_Comanda` INT NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `kartax`.`comanda_deta` 
ADD INDEX `FK_Comanda_Deta_idx` (`id_Comanda` ASC) VISIBLE;
ALTER TABLE `kartax`.`comanda_deta` 
ADD CONSTRAINT `FK_Comanda_Deta`
  FOREIGN KEY (`id_Comanda`)
  REFERENCES `kartax`.`comanda` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------
-- -------------------------------------------------------------------------------------------