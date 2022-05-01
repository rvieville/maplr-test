import { Router } from "express";
import PlayerController from "../controllers/player.controller";

const playercontroller = new PlayerController();

const playerRoute = Router().put("/:id/captain", playercontroller.update);

export default playerRoute;
