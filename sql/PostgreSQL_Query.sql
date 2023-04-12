CREATE DATABASE kartax
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Chile.1252'
    LC_CTYPE = 'Spanish_Chile.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ---------------------------------------------------------------------------
-- ---------------------------------------------------------------------------
BEGIN;

CREATE TABLE IF NOT EXISTS public."Negocio"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    rut character(12) NOT NULL,
    direccion character varying(255) NOT NULL,
    descripcion character varying(255),
    logo character varying(255),
    "isActive" boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Color"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    "R" integer NOT NULL,
    "G" integer NOT NULL,
    "B" integer NOT NULL,
    "id_Negocio" integer NOT NULL,
    PRIMARY KEY ("id_Negocio")
);

CREATE TABLE IF NOT EXISTS public."TipoAlimento"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    img character varying(255) NOT NULL,
    "isActive" boolean NOT NULL,
    "id_Negocio" integer NOT NULL,
    PRIMARY KEY ("id_Negocio")
);

CREATE TABLE IF NOT EXISTS public."ItemCateg"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    "id_TipoAlimento" integer NOT NULL,
    PRIMARY KEY ("id_TipoAlimento")
);

CREATE TABLE IF NOT EXISTS public."Item"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    descripcion character varying(255) NOT NULL,
    precio integer NOT NULL,
    img character varying(255) NOT NULL,
    "isActive" boolean NOT NULL,
    "id_ItemCateg" integer NOT NULL,
    PRIMARY KEY ("id_ItemCateg")
);

CREATE TABLE IF NOT EXISTS public."Usuario"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombres character varying(100) NOT NULL,
    apellidos character varying(100) NOT NULL,
    correo character varying(100),
    usuario character varying(100) NOT NULL,
    clave character varying(255) NOT NULL,
    "isActive" boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Usuario_Negocio"
(
    "id_Usuario" integer NOT NULL,
    "id_Negocio" integer NOT NULL,
    fecha date NOT NULL,
    PRIMARY KEY ("id_Usuario", "id_Negocio")
);

CREATE TABLE IF NOT EXISTS public."Comanda"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    fecha date NOT NULL,
    "isActive" boolean NOT NULL,
    "id_Mesa" integer,
    "id_Mesa_Temp" integer,
    PRIMARY KEY ("id_Mesa_Temp")
);

CREATE TABLE IF NOT EXISTS public."Mesa"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    nombre character varying(50) NOT NULL,
    descripcion character varying(50) NOT NULL,
    "isActive" boolean NOT NULL,
    "id_Negocio" integer NOT NULL,
    PRIMARY KEY ("id_Negocio")
);

CREATE TABLE IF NOT EXISTS public."ComandaDeta"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    fecha date NOT NULL,
    "id_Item" integer NOT NULL,
    "id_Comanda" integer NOT NULL,
    PRIMARY KEY (fecha)
);

CREATE TABLE IF NOT EXISTS public."Caja"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    monto integer NOT NULL,
    "fechaIni" date NOT NULL,
    "fechaFin" date NOT NULL,
    "isActive" boolean NOT NULL,
    "id_Usuario" integer NOT NULL,
    PRIMARY KEY ("id_Usuario")
);

CREATE TABLE IF NOT EXISTS public."Salida"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    fecha date NOT NULL,
    "id_Caja" integer NOT NULL,
    PRIMARY KEY ("id_Caja")
);

CREATE TABLE IF NOT EXISTS public."SalidaDeta"
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    "id_Item" integer NOT NULL,
    "nom_Item" character varying(50) NOT NULL,
    "precio_Item" integer NOT NULL,
    cant integer NOT NULL,
    "id_Salida" integer NOT NULL,
    PRIMARY KEY ("id_Item")
);

ALTER TABLE IF EXISTS public."Negocio"
    ADD FOREIGN KEY (id)
    REFERENCES public."Color" ("id_Negocio") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Negocio"
    ADD FOREIGN KEY (id)
    REFERENCES public."TipoAlimento" ("id_Negocio") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Negocio"
    ADD FOREIGN KEY (id)
    REFERENCES public."Usuario_Negocio" ("id_Negocio") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Negocio"
    ADD FOREIGN KEY (id)
    REFERENCES public."Mesa" ("id_Negocio") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."TipoAlimento"
    ADD FOREIGN KEY (id)
    REFERENCES public."ItemCateg" ("id_TipoAlimento") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."ItemCateg"
    ADD FOREIGN KEY (id)
    REFERENCES public."Item" ("id_ItemCateg") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Usuario"
    ADD FOREIGN KEY (id)
    REFERENCES public."Usuario_Negocio" ("id_Usuario") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Usuario"
    ADD FOREIGN KEY (id)
    REFERENCES public."Caja" ("id_Usuario") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Comanda"
    ADD FOREIGN KEY (id)
    REFERENCES public."ComandaDeta" ("id_Comanda") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Caja"
    ADD FOREIGN KEY (id)
    REFERENCES public."Salida" ("id_Caja") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Salida"
    ADD FOREIGN KEY (id)
    REFERENCES public."SalidaDeta" ("id_Salida") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;
