CREATE TABLE Movie
  (
    tconst text NOT NULL,
    primaryTitle  text NOT NULL,
    startYear integer NOT NULL,
    genres text NULL,
    PRIMARY KEY (tconst)
);

COPY Movie FROM '/docker-entrypoint-initdb.d/filtered.tsv' DELIMITER E'\t' CSV HEADER;
