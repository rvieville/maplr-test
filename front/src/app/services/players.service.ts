import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.mdoel';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  constructor(private readonly http: HttpClient) {}

  public get(year: string): Observable<Team> {
    return this.http.get<Team>(`http://localhost:3000/api/team/${year}`, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });
  }

  public create(year: string, player: any): Observable<Player> {
    return this.http.post<Player>(
      `http://localhost:3000/api/team/${year}`,
      player,
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
  }

  public setAsCaptain(id: number): Observable<Player> {
    return this.http.put<Player>(
      `http://localhost:3000/api/player/${id}/captain`,
      {
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );
  }
}
