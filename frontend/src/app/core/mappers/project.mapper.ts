import { ProjectResponse } from '../dto/projects/project-response.model';
import { Project } from 'src/app/models/project/project.model';

export class ProjectMapper {
  public static fromResponse(projectResponse: ProjectResponse): Project {
    return {
      id: projectResponse.id,
      name: projectResponse.name,
      description: projectResponse.description,
      startDate: projectResponse.startDate,
      endDate: projectResponse.endDate,
      status: projectResponse.status,
    };
  }

  public static fromResponses(projectResponses: ProjectResponse[]): Project[] {
    return projectResponses.map((projectResponse: ProjectResponse) =>
      this.fromResponse(projectResponse),
    );
  }
}
