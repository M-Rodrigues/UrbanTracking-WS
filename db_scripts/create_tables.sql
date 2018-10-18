CREATE TABLE modal 
(
	id SERIAL,
	nome VARCHAR(255) NOT NULL,
	CONSTRAINT pk_modal PRIMARY KEY (id)
)

CREATE TABLE estacao
(
    id SERIAL,
    nome VARCHAR(255) NOT NULL,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    idmodal BIGINT,
    CONSTRAINT pk_estacao PRIMARY KEY (id),
    CONSTRAINT fk_modal FOREIGN KEY (idmodal)
        REFERENCES modal (id)
)

CREATE TABLE linha
(
    id SERIAL,
    nome VARCHAR(255) NOT NULL,
    idmodal BIGINT,
    CONSTRAINT pk_linha PRIMARY KEY (id),
    CONSTRAINT fk_modal FOREIGN KEY (idmodal)
        REFERENCES modal (id)
)

CREATE TABLE rota
(
    id SERIAL,
    nome VARCHAR(255) NOT NULL,
    idlinha BIGINT,
    CONSTRAINT pk_rota PRIMARY KEY (id),
    CONSTRAINT fk_linha FOREIGN KEY (idlinha)
        REFERENCES linha (id)
)

CREATE TABLE trajeto
(
    idrota BIGINT NOT NULL,
    idestacao BIGINT NOT NULL,
    ordem INT,
    CONSTRAINT pk_trajeto PRIMARY KEY (idrota, idestacao),
    CONSTRAINT fk_estacao FOREIGN KEY (idestacao)
        REFERENCES estacao (id),
    CONSTRAINT fk_rota FOREIGN KEY (idrota)
        REFERENCES rota (id)
)

