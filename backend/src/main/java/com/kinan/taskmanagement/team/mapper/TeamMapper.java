package com.kinan.taskmanagement.team.mapper;

import com.kinan.taskmanagement.team.dto.CreateTeamRequest;
import com.kinan.taskmanagement.team.dto.TeamResponse;
import com.kinan.taskmanagement.team.dto.UpdateTeamRequest;
import com.kinan.taskmanagement.team.entity.Team;
import org.springframework.stereotype.Component;

@Component
public class TeamMapper {

    public Team toEntity(CreateTeamRequest request) {
        Team team = new Team();

        team.setName(request.getName());
        team.setDescription(request.getDescription());

        return team;
    }

    public TeamResponse toResponse(Team team) {
        TeamResponse response = new TeamResponse();

        response.setId(team.getId());
        response.setName(team.getName());
        response.setDescription(team.getDescription());

        return response;
    }

    public void updateEntity(Team team, UpdateTeamRequest request) {
        team.setName(request.getName());
        team.setDescription(request.getDescription());
    }

}