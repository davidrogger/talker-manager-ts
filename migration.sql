USE talker_manager_db;

CREATE TABLE user (
  id VARCHAR(50) PRIMARY KEY,
  first_name VARCHAR(15) NOT NULL,
  last_name VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE talker (
  id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL
);

CREATE TABLE lecture (
  id VARCHAR(50) PRIMARY KEY,
  talker_id VARCHAR(50) NOT NULL,
  title VARCHAR(50) NOT NULL,
  watchedAt CHAR(10) NOT NULL,

  FOREIGN KEY (talker_id) REFERENCES talker(id)
);

INSERT INTO user (id, first_name, last_name, email, password)
VALUES ('387f4c72-c314-456c-b00f-bd63a0a7ebd7', 'Talker', 'Manager', 'talker@manager.com', '$2b$10$hOuksoM1FCnUIWSK1xDg/.DccLN5SaNroTjmbsMC0Tcdv0xd8xdAi'); -- 123pass