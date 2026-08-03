import { ProjectStatus } from "src/app/shared/enums/project-status";

export interface CreateProjectRequest {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}
