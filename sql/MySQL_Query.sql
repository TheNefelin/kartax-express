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
	("FRANCISCO", "SLIFER", "NEFELIN", "123456", true);

SELECT * FROM usuario;

