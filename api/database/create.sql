create schema mini;

create table mini.users (
  id        serial primary key,
  name      text not null,
  followers int[],
  following int[],
  posts     int[],
  date      timestamp default now()
)

create table mini.posts (
  id       serial primary key,
  owner    int not null,
  likes    int[],
  comments int[],
  date     timestamp default now()
)

create table mini.comments (
  id    serial primary key,
  owner int not null,
  post  int not null,
  date  timestamp default now()
)