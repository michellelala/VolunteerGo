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

-- CREATE TABLE organizations (
--     id SERIAL PRIMARY KEY,
--     org_id INT REFERENCES users(id),
--     telephone VARCHAR,
--     address VARCHAR,
--     website VARCHAR,
--     flagged BOOLEAN DEFAULT FALSE
-- );


CREATE TABLE pings (
    id SERIAL PRIMARY KEY,
    volunteer_username VARCHAR REFERENCES users(username),
    org_id INT REFERENCES users(id),
    time_sent VARCHAR,
    start_time VARCHAR,
    duration VARCHAR,
	accepted BOOLEAN DEFAULT FALSE
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
    VALUES (DEFAULT, 'orgname1', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname1@blah.com', 'Org Name 1', TRUE, '555-555-1111', '100 fake street', 'fakewebsite1.com', false),
           (DEFAULT, 'orgname2', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname2@blah.com', 'Org Name 2', TRUE, '555-555-2222', '200 fake street', 'fakewebsite2.com', false),
           (DEFAULT, 'orgname3', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname3@blah.com', 'Org Name 3', TRUE, '555-555-3333', '300 fake street', 'fakewebsite3.com', true),
           (DEFAULT, 'orgname4', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname4@blah.com', 'Org Name 4', TRUE, '555-555-4444', '400 fake street', 'fakewebsite4.com', false),
           (DEFAULT, 'orgname5', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname5@blah.com', 'Org Name 5', TRUE, '555-555-5555', '500 fake street', 'fakewebsite5.com', false);

-- INSERT INTO organizations
-- 		VALUES (DEFAULT, 6, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
-- 					 (DEFAULT, 7, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
-- 					 (DEFAULT, 8, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
-- 					 (DEFAULT, 9, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
-- 					 (DEFAULT, 10, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT);

INSERT INTO pings
		VALUES (DEFAULT, 'michelle', 6, 'Monday 9:30AM', '5:00PM', '2 hours', false),
		             (DEFAULT, 'helen', 6, 'Tuesday 12:00PM', '4:00PM', '1 hour', true),
					 (DEFAULT, 'david', 9, 'Monday 3:14PM', '6:00PM', '1 hour', false),
					 (DEFAULT, 'princess', 7, 'Thursday 10:15AM', '5:30PM', '30 minutes', false),
					 (DEFAULT, 'chicken', 8, 'Monday 8:00AM', '3:00PM', '1 hour 30 minutes', true),
					 (DEFAULT, 'michelle', 10, 'Wednesday 11:09AM', '2:30PM', '4 hours', true);
