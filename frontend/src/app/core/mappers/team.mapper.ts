import { CreateTeamRequest } from '../dto/teams/create-team-request.model';
import { TeamResponse } from '../dto/teams/team-response.model';
import { UpdateTeamRequest } from '../dto/teams/update-team-request.model';
import { Team } from 'src/app/models/team/team.model';

export class TeamMapper {
  public static fromResponses(teamResponses: TeamResponse[]): Team[] {
    return teamResponses.map((teamResponse: TeamResponse) =>
      this.fromResponse(teamResponse),
    );
  }

  public static fromResponse(teamResponse: TeamResponse): Team {
    return {
      id: teamResponse.id,
      name: teamResponse.name,
      description: teamResponse.description,
    };
  }

  public static toCreateRequest(team: Team): CreateTeamRequest {
    return {
      name: team.name,
      description: team.description,
    };
  }

  public static toUpdateRequest(team: Team): UpdateTeamRequest {
    return {
      name: team.name,
      description: team.description,
    };
  }
}
