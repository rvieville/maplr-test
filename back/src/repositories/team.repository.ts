import * as mysql from "mysql2";
import { ResultSetHeader } from "mysql2";

export default class TeamRepository {
  private db: mysql.Connection;

  constructor() {
    this.db = mysql.createConnection({
      host: "localhost",
      user: "raf",
      password: "root",
      database: "Hockey",
    });
  }

  get = async (teamYear: string) => {
    const getPlayers = `SELECT
  	JSON_OBJECT(
  		'id', t.id,
  		'coach', t.coach,
  		'year', t.year,
  		'players', JSON_ARRAYAGG(JSON_OBJECT(
        'id', p.id,
  			'number', p.number,
  			'name', p.name,
  			'lastname', p.lastname,
  			'position', p.position,
  			'isCaptain', CAST(IF (p.is_capitain = 1, 'true', 'false') as json)
  			)
  		)
  	) as teams
    FROM teams as t
    LEFT JOIN player_team pt ON pt.team_id = t.id
    LEFT JOIN players p ON p.id = pt.player_id  
    WHERE year = ${teamYear}`;

    const data = await this.db.promise().query(getPlayers);

    return (data[0][0] as any).teams;
  };

  create = async (year: string, player: any) => {
    const getTeamId = `SELECT id FROM teams t WHERE t.year = ${year}`;
    const addPlayer =
      "INSERT IGNORE INTO players (number, name, lastname, position, is_capitain) VALUES (?, ?, ?, ?, ?)";
    const addPlayerInPlayerTeam =
      "INSERT IGNORE INTO player_team (id, player_id, team_id) VALUES (?, ?, ?)";

    const temId = (await this.db.promise().query(getTeamId))[0];
    const playerCreated = await this.db
      .promise()
      .query(addPlayer, [
        player.number,
        player.name,
        player.lastname,
        player.position,
        player.isCaptain ? 1 : 0,
      ]);

    const idPlayer = (playerCreated[0] as ResultSetHeader).insertId;

    const result = await this.db
      .promise()
      .query(addPlayerInPlayerTeam, ["", idPlayer, temId[0].id]);

    return player;
  };
}
