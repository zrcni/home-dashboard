/**
 * change timestamp data type to INTEGER–that's it
 */
export default [
  `CREATE TABLE conditions_tmp (
    location        text                NULL,
    client_id       text                NULL,
    device_id       text                NOT NULL,
    temperature     DOUBLE PRECISION    NOT NULL,
    humidity        DOUBLE PRECISION    NOT NULL,
    timestamp       INTEGER             NOT NULL
);`,
  `INSERT INTO conditions_tmp SELECT location, client_id, device_id, temperature, humidity, timestamp from conditions;`,
  `DROP TABLE conditions;`,
  `ALTER TABLE conditions_tmp RENAME TO conditions;`,
]
