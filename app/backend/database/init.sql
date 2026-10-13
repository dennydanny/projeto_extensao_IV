# Tabela feita para o MySQL

CREATE TABLE formato (
    id int primary key auto_increment,
    nome varchar(50) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE especialidade (
	id int primary key auto_increment,
	nome varchar(50) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE tipo_sala (
	id int primary key auto_increment,
	nome varchar(50) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);


CREATE TABLE disciplina (
	id int primary key auto_increment,
	nome varchar(50) not null,
	fk_formato int not null,
	constraint fk_formato foreign key (fk_formato) references formato(id),
	carga_horaria varchar(50) not null,
	horario_inicio datetime not null,
	horario_termino datetime not null,
	pratica int not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE disciplina_especialidade (
	id int primary key auto_increment,
	fk_disciplina int not null,
	constraint fk_disciplina foreign key (fk_disciplina) references disciplina(id),
	fk_especialidade int not null,
	constraint fk_especialidade foreign key (fk_especialidade) references especialidade(id),
	create_at datetime default current_timestamp,
	update_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE professor (
	id int primary key auto_increment,
	nome varchar(100) not null,
	fk_disciplina_especialidade int not null,
	constraint fk_disciplina_especialidade foreign key (fk_disciplina_especialidade) references disciplina_especialidade(id),
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE sala (
	id int primary key auto_increment,
	nome varchar(20) not null,
	limite_alunos int not null,
	fk_tipo_sala int not null,	
	constraint fk_tipo_sala foreign key (fk_tipo_sala) references tipo_sala(id),
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE usuario (
	id int primary key auto_increment,
	nome varchar(100) not null,
	data_nascimento datetime not null,
	cpf varchar(14) not null,
	email varchar(50) not null,
	senha varchar(255) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE log_action (
	id int primary key auto_increment,
	action varchar(255) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);

CREATE TABLE log (
	id int primary key auto_increment,
	fk_usuario int not null,
	fk_log_action int not null,
	dado_antigo varchar(255) not null,
	dado_atual varchar(255) not null,
	created_at datetime default current_timestamp,
	updated_at datetime default current_timestamp on update current_timestamp
);
