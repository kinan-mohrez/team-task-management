import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { CreateTeamRequest } from 'src/app/core/dto/teams/create-team-request.model';
import { TeamResponse } from 'src/app/core/dto/teams/team-response.model';
import { UpdateTeamRequest } from 'src/app/core/dto/teams/update-team-request.model';
import { TeamMapper } from 'src/app/core/mappers/team.mapper';
import { Team } from 'src/app/models/team/team.model';
import { API_ENDPOINTS } from 'src/app/core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private readonly apiUrl: string = `http://localhost:8080/api${API_ENDPOINTS.teams.base}`;

  public constructor(private readonly http: HttpClient) {}

  public getTeams(): Observable<Team[]> {
    return this.http
      .get<TeamResponse[]>(this.apiUrl)
      .pipe(
        map((teamResponses: TeamResponse[]) =>
          TeamMapper.fromResponses(teamResponses),
        ),
      );
  }

  public getTeamById(id: number): Observable<Team> {
    return this.http
      .get<TeamResponse>(`${this.apiUrl}/${id}`)
      .pipe(
        map((teamResponse: TeamResponse) =>
          TeamMapper.fromResponse(teamResponse),
        ),
      );
  }

  public createTeam(request: CreateTeamRequest): Observable<Team> {
    return this.http
      .post<TeamResponse>(this.apiUrl, request)
      .pipe(
        map((teamResponse: TeamResponse) =>
          TeamMapper.fromResponse(teamResponse),
        ),
      );
  }

  public updateTeam(id: number, request: UpdateTeamRequest): Observable<Team> {
    return this.http
      .put<TeamResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(
        map((teamResponse: TeamResponse) =>
          TeamMapper.fromResponse(teamResponse),
        ),
      );
  }

  public deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
