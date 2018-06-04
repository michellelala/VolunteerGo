DROP DATABASE IF EXISTS volunteergo;
CREATE DATABASE volunteergo;

\c volunteergo;


DROP TABLE IF EXISTS users, pings;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    password_digest VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE, 
    name VARCHAR,
    org BOOLEAN NOT NULL DEFAULT FALSE,
    telephone VARCHAR,
    address VARCHAR,
    website VARCHAR,
    flagged BOOLEAN DEFAULT FALSE
);


CREATE TABLE pings (
    id SERIAL PRIMARY KEY,
    volunteer_username VARCHAR REFERENCES users(username),
    org_id INT REFERENCES users(id),
    time_sent VARCHAR,
    start_time VARCHAR,
    duration VARCHAR,
	accepted BOOLEAN
);


-- SEED DATA // Volunteers
INSERT INTO users (id, username, password_digest, email, name, org)
    VALUES (DEFAULT, 'michelle', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@blah.com', 'Michelle', false),
           (DEFAULT, 'princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@blah.com', 'Princess', false),
           (DEFAULT, 'david', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'david@blah.com', 'David', false),
           (DEFAULT, 'helen', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'helen@blah.com', 'Helen', false),
           (DEFAULT, 'chicken', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'chicken@blah.com', 'Chicken', false);
-- SEED DATA // Organizations
INSERT INTO users
    VALUES (DEFAULT, 'nycares', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'someone@nycares.org', 'New York Cares', TRUE, '(212) 228-5000', '65 Broadway, Fl 19, New York, NY 10006', 'nycares.org', false),
           (DEFAULT, 'projectsunshine', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'someone@projectsunshine.org', 'Project Sunshine', TRUE, '(212) 354-8035', '211 E 43rd St, New York, NY 10017', 'projectsunshine.org', false),
           (DEFAULT, 'nycommonpantry', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'someone@nycommonpantry.org', 'NY Common Pantry', TRUE, '917-720-9700', '8 East 109th Street, New York, NY 10029', 'nycommonpantry.org', false),
           (DEFAULT, 'timesup', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'someone@timesup.org', 'Times Up', TRUE, '(212) 802-8222', '99 S 6th St, New York, NY 11211', 'times-up.org', false),
           (DEFAULT, 'bottomlessclosetnyc', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'someone@bottomlesscloset', 'Bottomless Closet NYC', TRUE, '(212) 563-2499', '16 E 52nd St, Fl 15, New York, NY 10022', 'bottomlessclosetnyc.org', false);


INSERT INTO pings
		VALUES (DEFAULT, 'michelle', 6, 'Tue May 01 2018 11:09:01 GMT-0400 (EDT)', '5:00PM', '2 hours', NULL),
		             (DEFAULT, 'helen', 6, 'Mon May 07 2018 11:03:54 GMT-0400 (EDT)', '4:00PM', '1 hour', true),
					 (DEFAULT, 'david', 9, 'Thu May 10 2018 09:14:32 GMT-0400 (EDT)', '6:00PM', '1 hour', false),
					 (DEFAULT, 'princess', 7, 'Mon May 28 2018 16:32:03 GMT-0400 (EDT)', '5:30PM', '30 minutes', NULL),
					 (DEFAULT, 'chicken', 8, 'Fri May 25 2018 12:05:54 GMT-0400 (EDT)', '3:00PM', '1 hour 30 minutes', true),
					 (DEFAULT, 'michelle', 10, 'Fri Jun 01 2018 11:05:54 GMT-0400 (EDT)', '2:30PM', '4 hours', true);
