DROP TABLE users CASCADE;
DROP TABLE lists CASCADE;

CREATE TABLE users (
    PRIMARY KEY (user_id),
    user_id     VARCHAR(255) NOT NULL,
    first_name  VARCHAR(25),   
    last_name   VARCHAR(25),
    email       VARCHAR(50)
);

CREATE TABLE lists (
    UNIQUE (user_id, company_name, job_title, city),
    user_id         VARCHAR(255) NOT NULL REFERENCES users(user_id),
    company_name    VARCHAR(50)  NOT NULL,
    job_title       VARCHAR(50)  NOT NULL,
    city            VARCHAR(50)  NOT NULL,
    website         VARCHAR(255),
    apply_date      DATE,
    app_status      VARCHAR(30),
    interview_date  TIMESTAMP,
    notes           TEXT
);