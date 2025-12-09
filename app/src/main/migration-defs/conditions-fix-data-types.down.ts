/**
 * change timestamp data type back to the non-existing type TIMESTAMPTZ–that's it
 */
export default [
  `CREATE TABLE conditions_tmp (
    location        text                NULL,
    client_id       text                NULL,
    device_id       text                NOT NULL,
    temperature     DOUBLE PRECISION    NOT NULL,
    humidity        DOUBLE PRECISION    NOT NULL,
    timestamp       TIMESTAMPTZ         NOT NULL
);`,
  `INSERT INTO conditions_tmp SELECT location, client_id, device_id, temperature, humidity, timestamp from conditions;`,
  `DROP TABLE conditions;`,
  `ALTER TABLE conditions_tmp RENAME TO conditions;`,
]
