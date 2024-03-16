-- Drop existing entities if they exist
DROP INDEX IF EXISTS chamber_gist;
DROP TABLE IF EXISTS chambers;
DROP TABLE IF EXISTS customers;

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

-- Create the customers table if it doesn't exist
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    building_latitude NUMERIC(10, 8) NOT NULL,
    building_longitude NUMERIC(11, 8) NOT NULL,
    chamberId VARCHAR(255),
    FOREIGN KEY (chamberId) REFERENCES chambers(id)
);
