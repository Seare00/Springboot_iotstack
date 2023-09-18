--Tabell
drop database if exists tempsensor;
create database tempsensor;
use tempsensor;

create table tempsensor (
    id int auto_increment primary key,
    sensor_id varchar(100) not null,
    tid timestamp default current_timestamp,
    temperatur decimal(5,2) not null
);
