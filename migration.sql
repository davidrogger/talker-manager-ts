USE talker_manager_db;

CREATE TABLE user (
  id CHAR(36) PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE talker (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE lecture (
  id CHAR(36) PRIMARY KEY,
  talker_id CHAR(36) NOT NULL,
  title VARCHAR(50) NOT NULL,
  watchedAt CHAR(10) NOT NULL,

  FOREIGN KEY (talker_id) REFERENCES talker(id)
);
