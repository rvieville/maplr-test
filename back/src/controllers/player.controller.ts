import { NextFunction, Request, Response } from "express";
import PlayerService from "../services/player.service";

export default class PlayerController {
  private playerService: PlayerService;
  private db: any;

  constructor() {
    this.playerService = new PlayerService();
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    const player = await this.playerService.getOne(req.params.id);

    await this.playerService.update(req.params.id, player);
    res.status(200).json(player);
  };
}
