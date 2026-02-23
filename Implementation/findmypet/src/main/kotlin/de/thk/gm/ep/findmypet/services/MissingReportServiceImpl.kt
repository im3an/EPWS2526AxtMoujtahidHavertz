package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.MissingReportPreviewResponseDto
import de.thk.gm.ep.findmypet.dtos.MissingReportRequestDto
import de.thk.gm.ep.findmypet.dtos.MissingReportResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.models.Coordinate
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.models.User
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import de.thk.gm.ep.findmypet.repositories.UserRepository
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import kotlin.jvm.optionals.getOrNull

@Service
class MissingReportServiceImpl(
    private val missingReportRepository: MissingReportRepository,
    private val userRepository: UserRepository
): MissingReportService {
    override fun getAll(): List<MissingReportResponseDto> {
        return missingReportRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(id: UUID): MissingReportResponseDto? {
        return missingReportRepository.findById(id)
            .getOrNull()?.toResponseDto()
    }

    @Transactional
    override fun save(missingReportRequestDto: MissingReportRequestDto): MissingReportResponseDto {

        val testUser = userRepository.findByEmail("test@test.de") ?: userRepository.save(
            User(name = "test", password = "test", email = "test@test.de", firstname = "test", surname = "test")
        )

        val missingReport = MissingReport(
            petName = missingReportRequestDto.petName,
            species = missingReportRequestDto.species,
            breed = missingReportRequestDto.breed,
            primaryColor = missingReportRequestDto.primaryColor,
            colorDetails = missingReportRequestDto.colorDetails,
            petSize = missingReportRequestDto.petSize,
            ageRange = missingReportRequestDto.ageRange,
            chipNumber = missingReportRequestDto.chipNumber,
            description = missingReportRequestDto.description,
            images = missingReportRequestDto.images,
            lostDate = missingReportRequestDto.lostDate,
            location = Coordinate(missingReportRequestDto.location.longitude, missingReportRequestDto.location.latitude),
            isPublic = missingReportRequestDto.isPublic,
            status = missingReportRequestDto.status,
            owner = testUser,
            areas = mutableListOf(),
            sightings = mutableListOf(),
            participants = mutableListOf()
        )
        return missingReportRepository.save(missingReport).toResponseDto()
    }

    @Transactional
    override fun update(
        missingReportRequestDto: MissingReportRequestDto,
        missingReportId: UUID
    ): MissingReportResponseDto {
        val missingReportToUpdate = missingReportRepository.findById(missingReportId).getOrNull()
            ?: throw NoSuchElementException("No matching report found for id $missingReportId")

        missingReportToUpdate.apply {
            petName = missingReportRequestDto.petName
            species = missingReportRequestDto.species
            breed = missingReportRequestDto.breed
            primaryColor = missingReportRequestDto.primaryColor
            colorDetails = missingReportRequestDto.colorDetails
            petSize = missingReportRequestDto.petSize
            ageRange = missingReportRequestDto.ageRange
            chipNumber = missingReportRequestDto.chipNumber
            description = missingReportRequestDto.description
            images = missingReportRequestDto.images
            lostDate = missingReportRequestDto.lostDate
            location = Coordinate(missingReportRequestDto.location.longitude, missingReportRequestDto.location.latitude)
            isPublic = missingReportRequestDto.isPublic
            status = missingReportRequestDto.status
        }
            return missingReportRepository.save(missingReportToUpdate).toResponseDto()

    }


    @Transactional
    override fun delete(missingReportId: UUID){
        missingReportRepository.deleteById(missingReportId)
    }

    override fun getByOwnerId(ownerId: UUID): List<MissingReportResponseDto> {
        TODO("Not yet implemented")
    }

    override fun getNearbyReports(
        lat: Double,
        lon: Double,
        radius: Double,
        page: Int,
        size: Int
    ): Page<MissingReportPreviewResponseDto> {
        val pageable = PageRequest.of(page, size)
        val reports = missingReportRepository.findNearbyReports(lat, lon, radius, pageable)

        return reports.map { report ->
            MissingReportPreviewResponseDto(
                id = report.getId(),
                petName = report.getPetName(),
                species = report.getSpecies(),
                previewImage = report.getPreviewImage() ?: "",
                distanceToUser = report.getDistance()
            )
        }
    }

    override fun search(
        lat: Double?, lon: Double?, radius: Double,
        petName: String?, species: String?, color: String?,
        size: String?, age: String?,
        page: Int, pageSize: Int
    ): Page<MissingReportPreviewResponseDto> {

        val pageable = PageRequest.of(page, pageSize)

        val projections = if (lat != null && lon != null) {
            missingReportRepository.findNearbyWithFilters(
                lat, lon, radius, petName, species, color, size, age, pageable
            )
        } else {
            missingReportRepository.findGlobalWithFilters(
                petName, species, color, size, age, pageable
            )
        }

        return projections.map { p ->
            MissingReportPreviewResponseDto(
                id = p.getId(),
                petName = p.getPetName(),
                species = p.getSpecies(),
                previewImage = p.getPreviewImage() ?: "",
                distanceToUser = p.getDistance()
            )
        }
    }

}