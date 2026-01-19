package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.MissingReportRequestDto
import de.thk.gm.ep.findmypet.dtos.MissingReportResponseDto
import java.util.*

interface MissingReportService {
    fun getAll(): List<MissingReportResponseDto>
    fun getById(id: UUID): MissingReportResponseDto?
    fun save(missingReportRequestDto: MissingReportRequestDto): MissingReportResponseDto
    fun update(missingReportRequestDto: MissingReportRequestDto, missingReportId: UUID): MissingReportResponseDto
    fun delete(missingReportId: UUID)
    fun getByOwnerId(ownerId: UUID): List<MissingReportResponseDto>

}