USE talker_manager_db;

CREATE TABLE user (
  id VARCHAR(10) PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(50) NOT NULL
);

CREATE TABLE talker (
  id VARCHAR(10) PRIMARY KEY,
  age INT NOT NULL
);

CREATE TABLE lecture (
  id VARCHAR(10) PRIMARY KEY,
  talker_id VARCHAR(10) NOT NULL,
  title VARCHAR(50) NOT NULL,
  watchedAt CHAR(10) NOT NULL,

  FOREIGN KEY (talker_id) REFERENCES talker(id)
);
