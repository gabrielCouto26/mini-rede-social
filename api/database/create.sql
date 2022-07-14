create schema api;

create table api.user (
  id        serial primary key,
  name      text not null,
  followers int[],
  following int[],
  posts     int[],
  date      timestamp default now()
)