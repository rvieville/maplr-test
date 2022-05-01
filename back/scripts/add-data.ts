import * as mysql from "mysql2";
const data: Array<any> = require("../mysql/data.json");

const db = mysql.createConnection({
  host: "localhost",
  user: "raf",
  password: "root",
  database: "Hockey",
});

const playersPerTeam = data.reduce((acc, cur) => {
  const index = acc?.findIndex((el) => el.id === cur.id);
  if (index !== -1) {
    cur.players.forEach((player) => {
      if (!acc[index].players.find((accPlayer) => accPlayer.id === player.id)) {
        acc[index].players.push(player);
      }
    });
  } else {
    acc.push(cur);
  }
  return acc;
}, []);

playersPerTeam.forEach((el) => {
  const query =
    "INSERT IGNORE INTO player_team (id, player_id, team_id) VALUES (?, ?, ?)";

  el.players.forEach((player) => {
    db.query(query, ["", player.id, el.id]);
  });
});

data.forEach((el) => {
  const queryPlayers =
    "INSERT IGNORE INTO players (id, number, name, lastname, position, is_capitain) VALUES (?, ?, ?, ?, ?, ?)";

  el.players?.forEach((player) => {
    db.query(queryPlayers, [
      player.id,
      player.number,
      player.name,
      player.lastname,
      player.position,
      player.is_capitain,
    ]);
  });

  const queryTeam =
    "INSERT IGNORE INTO teams (id, coach, year) VALUES (?, ?, ?)";

  db.query(queryTeam, [el.id, el.coach, el.year], (err, res) => {});
});

db.end();
