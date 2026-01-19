package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.ParticipantsRequestDto
import de.thk.gm.ep.findmypet.dtos.ParticipantsResponseDto
import de.thk.gm.ep.findmypet.services.ParticipantsService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.UUID

@RestController
@RequestMapping("/api/v1/participants")
class ParticipantsRestController(
    private val participantsService: ParticipantsService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun saveParticipant(@Valid @RequestBody participantsRequestDto: ParticipantsRequestDto): ParticipantsResponseDto {
        return participantsService.save(participantsRequestDto)
    }

    @GetMapping
    fun getAll(): List<ParticipantsResponseDto> {
        return participantsService.getAll()
    }

    @GetMapping("/account/{accountId}")
    fun getByAccount(@PathVariable accountId: UUID): List<ParticipantsResponseDto> {
        return participantsService.getByAccount(accountId)

    }
    @GetMapping("/missing-report/{reportId}")
    fun getByReport(@PathVariable reportId: UUID): List<ParticipantsResponseDto> {
        return participantsService.getByMissingReport(reportId)
    }

    @DeleteMapping("/account/{accountId}/missing-report/{reportId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteParticipant(
        @PathVariable accountId: UUID,
        @PathVariable reportId: UUID
    ) {
        participantsService.delete(accountId, reportId)
    }
}

