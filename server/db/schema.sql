create table `User` (
`id` varchar(50) not null primary key,
`pw` varchar(64) not null,
`otp_key` varchar(64) not null,
`success` tinyint(1) not null default 0,
`create_date` timestamp not null default current_timestamp
);

create table `Company` (
`company_id` int not null auto_increment primary key,
`name` varchar(50) unique,
`create_date` timestamp not null default current_timestamp
);

create table `Links` (
`links_id` int not null auto_increment primary key,
`company_id` int not null,
`type` varchar(20),
`url` varchar(500) unique,
FOREIGN KEY (`company_id`) REFERENCES `Company` (`company_id`) ON DELETE CASCADE
);

create table `Favorited` (
`favorited_id` int not null auto_increment primary key,
`id` varchar(50) not null,
`company_id` int not null,
FOREIGN KEY (`id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
FOREIGN KEY (`company_id`) REFERENCES `Company` (`company_id`) ON DELETE CASCADE
);

create table `SearchLog` (
`log_id` int not null auto_increment primary key,
`company_id` int not null,
`create_date` timestamp not null default current_timestamp,
FOREIGN KEY (`company_id`) REFERENCES `Company` (`company_id`) ON DELETE CASCADE
);