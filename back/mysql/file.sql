CREATE DATABASE IF NOT EXISTS Hockey;
USE Hockey; 

CREATE TABLE IF NOT EXISTS teams (
  id        serial PRIMARY KEY,
  coach     TEXT NOT NULL,
  year      INT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS players (
  id            serial PRIMARY KEY,
  number        INT DEFAULT NULL,
  name          TEXT DEFAULT NULL,
  lastname      TEXT DEFAULT NULL,
  position      TEXT DEFAULT NULL,
  is_capitain   boolean DEFAULT false
);


CREATE TABLE IF NOT EXISTS player_team (
  id            serial PRIMARY KEY,
  player_id     int REFERENCES players(id) ON DELETE CASCADE,
  team_id       int REFERENCES teams(id) ON DELETE CASCADE
);
