-- Drop existing entities if they exist
DROP INDEX IF EXISTS chamber_gist;
DROP TABLE IF EXISTS chambers;

-- Create the chambers table if it doesn't exist
CREATE TABLE IF NOT EXISTS chambers (
    id VARCHAR(10) PRIMARY KEY,
    latitude NUMERIC(9,6) NOT NULL,   
    longitude NUMERIC(9,6) NOT NULL,
    total_capacity INTEGER NOT NULL,
    used_capacity INTEGER NOT NULL,
    geom GEOGRAPHY(Point, 4326) NOT NULL
);

-- Create a GIST index on the geom column for spatial queries
CREATE INDEX chambers_gist ON chambers USING GIST (geom);