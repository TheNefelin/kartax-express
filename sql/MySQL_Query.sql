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
CALL sp_usuario_getAll("NEFELIN", "123456");
CALL sp_usuario_getAll("NEFELIN", "1234561");

------------------------------------------------------------------
CREATE PROCEDURE `sp_usuario_getAll`(
	txtUsuario VARCHAR(50), 
    txtClave VARCHAR(255)
)
BEGIN
    SET @cont = 0;
    SET @isActive = FALSE;
    
	SELECT 
		@cont := COUNT(id) 
	FROM usuario 
	WHERE 
		usuario = txtUsuario AND 
		clave = txtClave AND
		isActive = 1;
		
	IF  @cont > 0 THEN
		SET @isActive = TRUE;
	END IF;
    
    SELECT @isActive AS isActive;
END
