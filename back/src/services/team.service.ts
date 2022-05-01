import TeamRepository from "../repositories/team.repository";

export default class TeamService {
  private teamRepository: TeamRepository;

  constructor() {
    this.teamRepository = new TeamRepository();
  }
  get = async (year: string) => {
    return this.teamRepository.get(year);
  };

  create = async (year: string, player: any) => {
    return this.teamRepository.create(year, player);
  };
}
