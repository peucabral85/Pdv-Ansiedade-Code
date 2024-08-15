drop table if exists usuarios;
drop table if exists categorias;
drop table if exists produtos;
drop table if exists clientes;
drop table if exists pedidos;
drop table if exists pedido_produtos;

create table usuarios(
    id serial primary key,
    nome varchar(250) not null,
    email varchar(250) not null unique,
    senha text not null
);

create table categorias (
	id serial primary key,
    descricao varchar(250) not null
);

insert into categorias (descricao) values
  ('Informática'),
  ('Celulares'),
  ('Beleza e Perfumaria'),
  ('Mercado'),
  ('Livros e Papelaria'),
  ('Brinquedos'),
  ('Moda'),
  ('Bebê'),
  ('Games');

create table produtos (
	id serial primary key,
	descricao text not null,
	quantidade_estoque integer not null,
	valor integer not null,
	categoria_id int not null references categorias(id)
);

create table clientes (
	id serial primary key,
    nome varchar(250) not null,
	email varchar(250) not null unique,
	cpf varchar(14) not null unique,
	cep varchar(9),
	rua varchar(250),
	numero varchar(10),
	bairro varchar(250),
	cidade varchar(250),
	estado varchar(100)
);

alter table produtos
add column imagem_url text;

create table pedidos(
	id serial primary key,
    cliente_id integer not null references clientes(id),
    observacao text,
    valor_total integer
);

create table pedidos_produtos(
	id serial primary key,
    pedido_id integer not null references pedidos(id),
    produto_id integer not null references produtos(id),
    quantidade_produto integer not null,
    valor_produto integer
);