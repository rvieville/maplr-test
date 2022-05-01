import { NextFunction, Request, Response } from "express";
import TeamService from "../services/team.service";

export default class TeamController {
  private teamService: TeamService;
  private db: any;

  constructor() {
    this.teamService = new TeamService();
  }

  get = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const result = await this.teamService.get(req.params.year);

    res.status(200).json(result);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    const playerCreated = await this.teamService.create(
      req.params.year,
      req.body
    );

    res.status(201).json(playerCreated);
  };
}
