package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.AreaRequestDto
import de.thk.gm.ep.findmypet.dtos.AreaResponseDto
import java.util.UUID

interface AreaService {
    fun getAll(): List<AreaResponseDto>
    fun getById(areaId: UUID): AreaResponseDto?
    fun save(areaRequestDto: AreaRequestDto, missingReportId: UUID): AreaResponseDto
    fun update(areaRequestDto: AreaRequestDto, missingReportId: UUID, areaId: UUID): AreaResponseDto?
    fun delete(areaReportId: UUID)
    fun getByMissingReport(missingReportId: UUID): List<AreaResponseDto>
    fun getByMissingReportAndId(missingReportId: UUID, areaId: UUID): AreaResponseDto?

}