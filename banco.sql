create database oncocare;
use oncocare;

 
create table usuarios(
	id int primary key not null auto_increment,
    nome varchar(255) not null,
    email varchar(255) not null,
    idade varchar(255) not null,
    cpf varchar(255) not null,
    senha varchar(255) not null,
    status enum ('ativo', 'inativo') default ('ativo'),
    created_at timestamp default current_timestamp
);

create table locais_mapa (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(50), 
    endereco VARCHAR(255),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    telefone VARCHAR(20),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conteudos (
    id int primary key not null auto_increment,
    titulo varchar(255) not null,
    resumo varchar(255),
    url varchar(255), 
    fonte varchar(255),
    categoria varchar(255),
    data_publicacao date,
    criado_em timestamp default current_timestamp 
);

create table compromissos (
	id int not null primary key auto_increment,
    usuario_id int not null,
    titulo varchar(255) not null, 
    descricao varchar(255),
    dia date not null, 
    hora time not null, 
    aviso_antecipado int default 0, 
    criado_em timestamp default current_timestamp, 
    foreign key (usuario_id) references usuarios(id) 
);

create table anotacoes (
	id int not null auto_increment primary key,
    usuario_id int not null, 
    titulo varchar(255) not null, 
    conteudo varchar(255),
    imagem varchar(255),
    foreign key (usuario_id) references usuarios(id),
    tempo timestamp default current_timestamp
);
