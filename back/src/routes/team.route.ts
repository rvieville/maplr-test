import { Router } from "express";
import TeamController from "../controllers/team.controller";

const teamController = new TeamController();

const teamRoute = Router()
  .get("/:year", teamController.get)
  .post("/:year", teamController.create);

export default teamRoute;
