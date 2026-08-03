import { ProjectStatus } from "src/app/shared/enums/project-status";

export interface UpdateProjectRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}
