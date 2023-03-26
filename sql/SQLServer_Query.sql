CREATE TABLE [demo_Color](
	[id] INT NOT NULL,
	[nombre] VARCHAR NULL,
	[R] INT NULL,
	[G] INT NULL,
	[B] INT NULL,
	[idNegocio] INT NULL
)

CREATE TABLE [demo_Comanda](
	[id] INT NOT NULL,
	[id_Mesa] INT NOT NULL,
	[fecha] DATETIME NOT NULL,
	[isActivo] BIT NULL,
	[id_Negocio] INT NULL
)

CREATE TABLE [demo_ComandaDeta](
	[id] INT NOT NULL,
	[id_Comanda] INT NULL,
	[id_Item] INT NULL,
	[fecha] DATETIME NULL
)

CREATE TABLE [demo_Item](
	[id] INT NOT NULL,
	[nombre] VARCHAR(50) NULL,
	[descripcion] VARCHAR(500) NULL,
	[precio] INT NULL,
	[link] VARCHAR(255) NULL,
	[id_ItemCateg] INT NULL,
	[isActivo] BIT NULL,
	[id_Negocio] INT NULL
)

CREATE TABLE [demo_ItemCateg](
	[id] INT NOT NULL,
	[nombre] VARCHAR(50) NULL,
	[id_TipoAlimento] INT NULL,
	[id_Negocio] INT NULL
)

CREATE TABLE [demo_Mesa](
	[id] INT NOT NULL,
	[titulo] VARCHAR(50) NULL,
	[descripcion] VARCHAR(100) NULL,
	[x] INT NULL,
	[y] INT NULL,
	[isActivo] BIT NULL,
	[id_Negocio] INT NULL
)

CREATE TABLE [demo_Negocio](
	[id] INT NOT NULL,
	[nombre] VARCHAR(50) NULL,
	[link] VARCHAR(255) NULL,
	[isActivo] BIT NULL
)

CREATE TABLE [demo_Salida](
	[id] INT NOT NULL,
	[fehca] DATETIME NULL,
	[id_Negocio] INT NULL
)

CREATE TABLE [demo_SalidaDeta](
	[id] INT NOT NULL,
	[id_Item] INT NULL,
	[precio] INT NULL,
	[cant] INT NULL,
	[isActivo] BIT NULL,
	[id_Negocio] INT NULL,
	[id_Salida] INT NULL
)

CREATE TABLE [demo_TipoAlimento](
	[id] INT NOT NULL,
	[nombre] VARCHAR(50) NULL,
	[link] VARCHAR(255) NULL,
	[isActivo] BIT NULL,
	[id_Negocio] INT NULL
)

INSERT demo_Color (id, nombre, R, G, B, idNegocio) 
VALUES 
	(1, N'colorBase01', 0, 0, 0, 1),
	(2, N'colorBase02', 255, 255, 255, 1),
	(3, N'colorBase03', 102, 102, 102, 1),
	(4, N'color01', 32, 148, 243, 1),
	(5, N'color02', 190, 0, 29, 1),
	(6, N'color03', 252, 161, 32, 1),
	(7, N'color04', 0, 255, 255, 1)

INSERT demo_Item (id, nombre, descripcion, precio, link, id_ItemCateg, isActivo, id_Negocio) 
VALUES 
	(1, N'Pils', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 5500, N'./img/item_01.png', 1, 1, 1),
	(2, N'Santa Sed', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 4800, N'./img/item_02.png', 1, 1, 1),
	(3, N'Blood', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 4500, N'./img/item_03.png', 1, 1, 1),
	(4, N'Heineken', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 2500, N'./img/item_04.jpg', 2, 1, 1),
	(5, N'Kross', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 3500, N'./img/item_05.jpg', 2, 1, 1),
	(6, N'Kunstmann', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 2500, N'./img/item_06.jpg', 2, 1, 1),
	(7, N'Budweiser', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 2000, N'./img/item_07.jpg', 2, 1, 1),
	(8, N'Royal', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 2500, N'./img/item_08.jpg', 2, 1, 1),
	(9, N'Tabla de Carne', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 7000, N'./img/item_09.png', 3, 1, 1),
	(10, N'Tabla de Queso', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 7000, N'./img/item_10.png', 3, 1, 1),
	(11, N'Tabla Veggie', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 7000, N'./img/item_11.png', 3, 1, 1),
	(12, N'Papas Rústicas', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 5000, N'./img/item_12.png', 3, 1, 1),
	(13, N'Papas Merken', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 5000, N'./img/item_13.png', 3, 1, 1),
	(14, N'Papas Cheddar', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_14.png', 3, 1, 1),
	(15, N'Hamburguesa de Res', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_15.png', 4, 1, 1),
	(16, N'Hamburguesa Pollo Apanado', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_16.png', 4, 1, 1),
	(17, N'Hamburguesa Doble Cheddar', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_17.png', 4, 1, 1),
	(18, N'Hamburguesa Mechada', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_18.png', 4, 1, 1),
	(19, N'Hamburguesa Veggie', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_19.png', 4, 1, 1),
	(20, N'Hamburguesa Veggie Legumbres', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 6000, N'./img/item_20.png', 4, 1, 1),
	(21, N'Completo Mexicano', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 3000, N'./img/item_21.png', 5, 1, 1),
	(22, N'Completo Tocino', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 3000, N'./img/item_22.png', 5, 1, 1),
	(23, N'Completo Italiano', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 3000, N'./img/item_23.png', 5, 1, 1),
	(24, N'Completo Aleman', N'nace de lupulo y cebada, y vive en una botella encerrada, puede ser morena o dorada, puede ser de trigo o cereza, para ser sincero sin rodeo digo, buena amiga es la cerveza"', 3000, N'./img/item_24.png', 5, 1, 1)


INSERT demo_ItemCateg (id, nombre, id_TipoAlimento, id_Negocio) 
VALUES 
	(1, N'Cervezas Artesanales', 1, 1),
	(2, N'Cervezas Envasadas', 1, 1),
	(3, N'De la Casa', 2, 1),
	(4, N'Hamburguesas', 3, 1),
	(5, N'Completos', 3, 1)

INSERT demo_Negocio (id, nombre, link, isActivo) VALUES (1, N'Kartax', N'/img/logo.png', 1)

INSERT demo_TipoAlimento (id, nombre, link, isActivo, id_Negocio)
VALUES 
	(1, N'Para Beber', N'/img/grupo_01.jpg', 1, 1),
	(2, N'Tablas', N'/img/grupo_03.jpg', 1, 1),
	(3, N'Para chanchear', N'/img/grupo_02.jpg', 1, 1)

CREATE PROCEDURE [dbo].[pa_Item_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		descripcion,
		precio,
		link,
		id_ItemCateg,
		id_Negocio
	FROM demo_Item
	WHERE isActivo = 1
END

CREATE PROCEDURE [dbo].[pa_Item_GetById]
	 @id AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		descripcion,
		precio,
		link,
		id_ItemCateg,
		id_Negocio
	FROM demo_Item
	WHERE 
		isActivo = 1
		AND id = @id
END

CREATE PROCEDURE [dbo].[pa_Item_GetByIdCateg]
	@id_ItemCateg AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		descripcion,
		precio,
		link,
		id_ItemCateg,
		id_Negocio
	FROM demo_Item
	WHERE 
		isActivo = 1
		AND id_ItemCateg = @id_ItemCateg
END

CREATE PROCEDURE [dbo].[pa_Item_GetByIdNegocio]
	@id_Negocio AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		descripcion,
		precio,
		link,
		id_ItemCateg,
		id_Negocio
	FROM demo_Item
	WHERE 
		isActivo = 1
		AND id_Negocio = @id_Negocio
END

CREATE PROCEDURE [dbo].[pa_ItemCateg_GetAll]

AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		id_TipoAlimento,
		id_Negocio
	FROM demo_ItemCateg
END

CREATE PROCEDURE [dbo].[pa_ItemCateg_GetById]
	@id_Negocio AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		id_TipoAlimento,
		id_Negocio
	FROM demo_ItemCateg
	WHERE id_Negocio = @id_Negocio
END

CREATE PROCEDURE [dbo].[pa_ItemCateg_GetByIdNegocio]
	@id_Negocio AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		id_TipoAlimento,
		id_Negocio
	FROM demo_ItemCateg
	WHERE id_Negocio = @id_Negocio
END

CREATE PROCEDURE [dbo].[pa_ItemCateg_GetByIdTipoAlim]
	@id_TipoAlimento AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT 
		id,
		nombre,
		id_TipoAlimento,
		id_Negocio
	FROM demo_ItemCateg
	WHERE id_TipoAlimento =  @id_TipoAlimento
END

CREATE PROCEDURE [dbo].[pa_Negocio_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		id,
		nombre,
		link
	FROM demo_Negocio
	WHERE isActivo = 1;
END

CREATE PROCEDURE [dbo].[pa_Negocio_GetById]
	@id AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		id,
		nombre,
		link,
		isActivo
	FROM demo_Negocio
	WHERE id = @id
END

CREATE PROCEDURE [dbo].[pa_TipoAlimento_GetAll]
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		id,
		nombre,
		link,
		id_Negocio
	FROM demo_TipoAlimento
	WHERE isActivo = 1
END

CREATE PROCEDURE [dbo].[pa_TipoAlimento_GetById]
	@id_Negocio AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		id,
		nombre,
		link,
		id_Negocio
	FROM demo_TipoAlimento
	WHERE 
		isActivo = 1
		AND id_Negocio = @id_Negocio
END

CREATE PROCEDURE [dbo].[pa_TipoAlimento_GetByIdNegocio]
	@id_Negocio AS INT
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		id,
		nombre,
		link,
		id_Negocio
	FROM demo_TipoAlimento
	WHERE 
		isActivo = 1
		AND id_Negocio = @id_Negocio
END

