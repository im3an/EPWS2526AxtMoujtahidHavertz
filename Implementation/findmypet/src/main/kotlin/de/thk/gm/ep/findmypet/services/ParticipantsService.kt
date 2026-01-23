package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.ParticipantsRequestDto
import de.thk.gm.ep.findmypet.dtos.ParticipantsResponseDto

import de.thk.gm.ep.findmypet.models.ParticipantsId
import java.util.UUID

interface ParticipantsService {
    fun getAll(): List<ParticipantsResponseDto>
    fun getById(id: ParticipantsId): ParticipantsResponseDto?
    fun getByAccount(accountId: UUID): List<ParticipantsResponseDto>
    fun getByMissingReport(missingReportId: UUID): List<ParticipantsResponseDto>
    fun save(participantsRequestDto: ParticipantsRequestDto): ParticipantsResponseDto
    fun delete(accountId: UUID, missingReportId: UUID)

}