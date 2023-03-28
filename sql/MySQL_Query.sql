CREATE SCHEMA `kartax` ;

CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `isActive` bit(1) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO usuario
	(nombres, apellidos, usuario, clave, isActive)
VALUES
	("FRANCISCO", "SLIFER", "NEFELIN", "123456", TRUE),
    ("ELI", "CHANFLES", "CAEZA", "123456", TRUE);

SELECT * FROM usuario;
TRUNCATE TABLE usuario;
CALL sp_usuario_get("NEFELIN", "123456");
CALL sp_usuario_get("NEFELIN", "1234561");
CALL sp_usuario_set("PRUEBA", "NO", "NEFELIN", 123456);
CALL sp_usuario_set("PRUEBA", "NO", "FRANCISCO", 123456);

------------------------------------------------------------------
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_getAll`(
	txtUsuario VARCHAR(50), 
    txtClave VARCHAR(255)
)
BEGIN
    SET @cont = 0;
    SET @isActive = FALSE;
    SET @cont := 
	(SELECT 
		COUNT(id) 
	FROM usuario 
	WHERE 
		usuario = txtUsuario AND 
		clave = txtClave AND
		isActive = 1);
		
	IF  @cont > 0 THEN
		SET @isActive = TRUE;
	END IF;
    
    SELECT @isActive AS isActive;
END

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_usuario_set`(
	nombres VARCHAR(50),
    apellidos VARCHAR(50),
    usuario VARCHAR(50),
    clave VARCHAR(255)
)
BEGIN
	SET @cont = 0;
    SET @isActive = FALSE;
    SET @msge = "";
    
    SET @cont := 
    (SELECT 
		COUNT(id) 
    FROM usuario a 
    WHERE a.usuario = usuario);
    
    IF (@cont = 0) THEN
		SET @isActive = TRUE;
        SET @msge = "Usuario Registrado Correctamente";
	ELSE
		SET @isActive = FALSE;
        SET @msge = "Usuario ya Existe";
    END IF;
    
    SELECT @isActive AS isActive, @msge AS msge;
END