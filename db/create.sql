DROP TABLE users CASCADE;
DROP TABLE lists CASCADE;

CREATE TABLE users (
    PRIMARY KEY (user_id),
    user_id     INT         NOT NULL,
    user_name   VARCHAR(50) NOT NULL
);

CREATE TABLE lists (
    PRIMARY KEY (entry_id),
    entry_id        INT NOT NULL,
    user_id         INT NOT NULL REFERENCES users(user_id),
    job_title       VARCHAR(50),
    company_name    VARCHAR(50),
    website         VARCHAR(255),
    area            VARCHAR(50),
    apply_method    VARCHAR(50),
    apply_date      DATE,
    last_response   DATE,
    app_status      VARCHAR(30),
    interview_date  TIMESTAMP,
    notes           TEXT
);