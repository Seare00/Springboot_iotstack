--Tabell
drop database if exists sensors;
create database sensors;

USE sensors;

create table temperatur (
    Id int auto_increment primary key,
    Temp float not null,
    Datum timestamp default current_timestamp
);
--Information för kopplingen mellan python script och sql.
drop user arduino;
CREATE USER 'arduino'@'%' IDENTIFIED BY 'password';
GRANT INSERT ON sensors.temperatur TO 'arduino'@'%';

-- för att kolla temp data tabellen. om allt funkar så dyker temp datan i 1 sekunds interval.
select * from temperatur;
