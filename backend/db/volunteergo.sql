DROP DATABASE IF EXISTS volunteergo;
CREATE DATABASE volunteergo;

\c volunteergo;


DROP TABLE IF EXISTS users, organizations, pings;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE, 
  name VARCHAR,
  org BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE organizations (
    id SERIAL PRIMARY KEY,
    org_id INT REFERENCES users(id),
    telephone VARCHAR,
    address VARCHAR,
    website VARCHAR,
    flagged BOOLEAN DEFAULT FALSE
);


CREATE TABLE pings (
    id SERIAL PRIMARY KEY,
    volunteer_id INT REFERENCES users(id),
    organization_id INT REFERENCES users(id),
    time_sent VARCHAR,
    duration VARCHAR
);


-- SEED DATA
INSERT INTO users
        -- VOLUNTEERS
    VALUES (DEFAULT, 'michelle', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'michelle@blah.com', 'Michelle', false),
           (DEFAULT, 'princess', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'princess@blah.com', 'Princess', false),
           (DEFAULT, 'david', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'david@blah.com', 'David', false),
           (DEFAULT, 'helen', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'helen@blah.com', 'Helen', false),
           (DEFAULT, 'chicken', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'chicken@blah.com', 'Chicken', false),
        -- ORGANIZATIONS
           (DEFAULT, 'orgname1', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname1@blah.com', 'Org Name 1', TRUE),
           (DEFAULT, 'orgname2', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname2@blah.com', 'Org Name 2', TRUE),
           (DEFAULT, 'orgname3', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname3@blah.com', 'Org Name 3', TRUE),
           (DEFAULT, 'orgname4', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname4@blah.com', 'Org Name 4', TRUE),
           (DEFAULT, 'orgname5', '$2a$10$f17jjX0NASQWYOln23Ogk.ePXm0TpAs2oq.k4.YOGQGTnkOvZlD/O', 'orgname5@blah.com', 'Org Name 5', TRUE);

INSERT INTO organizations
		VALUES (DEFAULT, 6, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
					 (DEFAULT, 7, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
					 (DEFAULT, 8, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
					 (DEFAULT, 9, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT),
					 (DEFAULT, 10, '(000)555-1234', 'address goes here', 'website goes here', DEFAULT);