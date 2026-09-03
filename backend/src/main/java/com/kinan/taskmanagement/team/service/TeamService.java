package com.kinan.taskmanagement.team.service;

import com.kinan.taskmanagement.exception.DuplicateResourceException;
import com.kinan.taskmanagement.exception.ResourceNotFoundException;
import com.kinan.taskmanagement.team.dto.CreateTeamRequest;
import com.kinan.taskmanagement.team.dto.TeamResponse;
import com.kinan.taskmanagement.team.dto.UpdateTeamRequest;
import com.kinan.taskmanagement.team.entity.Team;
import com.kinan.taskmanagement.team.mapper.TeamMapper;
import com.kinan.taskmanagement.team.repository.TeamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMapper teamMapper;

    public TeamService(
            TeamRepository teamRepository,
            TeamMapper teamMapper
    ) {
        this.teamRepository = teamRepository;
        this.teamMapper = teamMapper;
    }

    public Page<TeamResponse> getAllTeams(
            int page,
            int size,
            String sortBy,
            String sortDirection,
            String search
    ) {

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(
                page,
                size,
                sort
        );

        if (search == null || search.isBlank()) {
            return this.teamRepository.findAll(pageable)
                    .map(this.teamMapper::toResponse);
        }

        return this.teamRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                        search,
                        search,
                        pageable
                )
                .map(this.teamMapper::toResponse);
    }

    public TeamResponse getTeamById(Long id) {

        Team team = teamRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Team not found with id: " + id
                        )
                );

        return teamMapper.toResponse(team);
    }

    public TeamResponse createTeam(CreateTeamRequest request) {

        if (teamRepository.existsByName(request.getName())) {
            throw new DuplicateResourceException(
                    "Team with name '" + request.getName() + "' already exists."
            );
        }

        Team team = teamMapper.toEntity(request);

        Team savedTeam = teamRepository.save(team);

        return teamMapper.toResponse(savedTeam);
    }

    public TeamResponse updateTeam(
            Long id,
            UpdateTeamRequest request
    ) {

        Team team = teamRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Team not found with id: " + id
                        )
                );

        if (!team.getName().equals(request.getName())
                && teamRepository.existsByName(request.getName())) {

            throw new DuplicateResourceException(
                    "Team with name '" + request.getName() + "' already exists."
            );
        }

        teamMapper.updateEntity(team, request);

        Team updatedTeam = teamRepository.save(team);

        return teamMapper.toResponse(updatedTeam);
    }

    public void deleteTeam(Long id) {

        Team team = teamRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Team not found with id: " + id
                        )
                );

        teamRepository.delete(team);
    }
}