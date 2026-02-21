package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.MissingReportPreviewResponseDto
import de.thk.gm.ep.findmypet.dtos.MissingReportRequestDto
import de.thk.gm.ep.findmypet.dtos.MissingReportResponseDto
import org.springframework.data.domain.Page
import java.util.*

interface MissingReportService {
    fun getAll(): List<MissingReportResponseDto>
    fun getById(id: UUID): MissingReportResponseDto?
    fun save(missingReportRequestDto: MissingReportRequestDto): MissingReportResponseDto
    fun update(missingReportRequestDto: MissingReportRequestDto, missingReportId: UUID): MissingReportResponseDto
    fun delete(missingReportId: UUID)
    fun getByOwnerId(ownerId: UUID): List<MissingReportResponseDto>
    fun getNearbyReports(lat: Double, lon: Double, radius: Double, page: Int, size: Int): Page<MissingReportPreviewResponseDto>

}