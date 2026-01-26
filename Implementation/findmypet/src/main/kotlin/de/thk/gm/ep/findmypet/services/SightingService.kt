package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.SightingRequestDto
import de.thk.gm.ep.findmypet.dtos.SightingResponseDto
import java.util.UUID

interface SightingService {
    fun getSightingById(sightingId: UUID): SightingResponseDto?
    fun getAllSightingsByMissingReport(missingReportId: UUID): List<SightingResponseDto>
    fun save(sightingRequestDto: SightingRequestDto, missingReportId: UUID): SightingResponseDto
    fun delete(missingReportId: UUID, sightingId: UUID)
    fun update(sightingRequestDto: SightingRequestDto, missingReportId: UUID, sightingId: UUID): SightingResponseDto
}