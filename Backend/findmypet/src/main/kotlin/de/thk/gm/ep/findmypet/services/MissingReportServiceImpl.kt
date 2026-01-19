package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.MissingReportRequestDto
import de.thk.gm.ep.findmypet.dtos.MissingReportResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.models.Coordinate
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import org.springframework.stereotype.Service
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class MissingReportServiceImpl(private val missingReportRepository: MissingReportRepository): MissingReportService {
    override fun getAll(): List<MissingReportResponseDto> {
        return missingReportRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(id: UUID): MissingReportResponseDto? {
        return missingReportRepository.findById(id)
            .getOrNull()?.toResponseDto()
    }

    override fun save(missingReportRequestDto: MissingReportRequestDto): MissingReportResponseDto {
        val missingReport = MissingReport(
            petName = missingReportRequestDto.petName,
            location = Coordinate(missingReportRequestDto.location.longitude, missingReportRequestDto.location.latitude),
            description = missingReportRequestDto.description,
            images = null,
            public = missingReportRequestDto.public,
            ownerId = UUID.randomUUID(), //Platzhalter später wird die ID über Principal abgerufen (Spring Boot Security)
            status = missingReportRequestDto.status
        )
        return missingReportRepository.save(missingReport).toResponseDto()
    }

    override fun update(
        missingReportRequestDto: MissingReportRequestDto,
        missingReportId: UUID
    ): MissingReportResponseDto {
        val missingReportToUpdate = missingReportRepository.findById(missingReportId).getOrNull()
            ?: throw NoSuchElementException("No matching report found for id $missingReportId")
        missingReportToUpdate.apply {
            petName = missingReportRequestDto.petName
            location = Coordinate(missingReportRequestDto.location.longitude, missingReportRequestDto.location.latitude)
            description = missingReportRequestDto.description
            public = missingReportRequestDto.public
            status = missingReportRequestDto.status
        }
            return missingReportRepository.save(missingReportToUpdate).toResponseDto()

    }

    override fun delete(missingReportId: UUID){
        missingReportRepository.deleteById(missingReportId)
    }

    override fun getByOwnerId(ownerId: UUID): List<MissingReportResponseDto> {
        TODO("Not yet implemented")
    }

}