CREATE TABLE IF NOT EXISTS conditions (
    location        text                NULL,
    client_id       text                NULL,
    device_id       text                NOT NULL,
    temperature     DOUBLE PRECISION    NOT NULL,
    humidity        DOUBLE PRECISION    NOT NULL,
    timestamp       TIMESTAMPTZ         NOT NULL
);
