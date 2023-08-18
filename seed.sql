USE talker_manager_db;

INSERT INTO user (id, first_name, last_name, email, password)
VALUES ('387f4c72-c314-456c-b00f-bd63a0a7ebd7', 'Talker', 'Manager', 'talker@manager.com', '$2b$10$hOuksoM1FCnUIWSK1xDg/.DccLN5SaNroTjmbsMC0Tcdv0xd8xdAi'); -- 123pass

INSERT INTO talker (id, name)
VALUES ('6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Davíd Roggér');

INSERT INTO talker (id, name)
VALUES ('f55a0429-e03a-4fdb-bffa-071ccb1a5a1a', 'Jonas Doe');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('262cd336-50ea-4a9e-83b5-a3c829e140f5', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing FullStack', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('1b9babeb-f5b0-4d4c-9bd9-27918d2430d4', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Frontend', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('1dad1076-5b1c-4194-b480-18b8808b471b', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Backend', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('be2d8790-d7be-464f-992e-26dc29025d85', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Docker', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('7db8a73f-e461-4bb7-bc04-fe1deae5f3ca', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Jest', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('8fb64a73-971c-44f9-9e84-08c9fa258978', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Nextjs', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('807165e3-3ead-4263-be3e-b5c0f066aad6', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Express', '08/08/2023');

INSERT INTO lecture (id, talker_id, title, watched_at)
VALUES ('89534693-52d2-4d68-936b-fb64e758c866', '6e49e918-6c5b-4d1e-8d86-73e87ee536f9', 'Practicing Typescript', '08/08/2023');