 Database SecurityDb

create table users(
	userid serial primary key,
	username varchar(50) not null,
	fullname varchar(50) not null,
	gender varchar(20) not null,
	dateofbirth date not null,
	address varchar(100) not null,
	mobilenumber varchar(20) not null,
	email varchar(40) not null,
	pasword varchar(130) not null,
	picture varchar(150) null
)