import PlayerRepository from "../repositories/player.repository";

export default class PlayerService {
  private playerRepository: PlayerRepository;

  constructor() {
    this.playerRepository = new PlayerRepository();
  }

  getOne = async (id: string) => {
    return this.playerRepository.getOne(id);
  };

  update = async (id: string, player: any) => {
    return this.playerRepository.update(id, player);
  };
}
