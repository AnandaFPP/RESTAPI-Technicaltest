create table users(
    user_id varchar,
    user_name varchar not null,
    user_password varchar not null
);

create table jobs(
    job_id varchar primary key not null,
    job_name varchar not null,
    job_location varchar not null,
    job_type varchar not null,
    job_desc text
);