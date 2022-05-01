import { query } from "express";
import * as mysql from "mysql2";

export default class PlayerRepository {
  private db: mysql.Connection;

  constructor() {
    this.db = mysql.createConnection({
      host: "localhost",
      user: "raf",
      password: "root",
      database: "Hockey",
    });
  }

  getOne = async (id: string) => {
    const getPlayer = `SELECT 
    JSON_OBJECT(
      'id', p.id,
      'number', p.number,
      'name', p.name,
      'lastname', p.lastname,
      'position', p.position,
      'isCaptain', CAST(IF (p.is_capitain = 1, 'true', 'false') as json)
        ) as player
    FROM players p
    WHERE id = ${id}`;

    const player = await this.db.promise().query(getPlayer);

    return player[0][0].player;
  };

  update = async (id: string, player: any) => {
    const getCaptain = "SELECT * FROM players WHERE is_capitain = 1";
    const putAsCaptain = `UPDATE players SET is_capitain = 1 WHERE id = ${id}`;

    const captains = await this.db.promise().query(getCaptain);
    const captain = captains[0][0];

    if (captain) {
      const removeCaptain = `UPDATE players SET is_capitain = 0 WHERE id = ${captain.id}`;
      await this.db.promise().query(removeCaptain);
    }

    await this.db.promise().query(putAsCaptain);

    return player;
  };
}
