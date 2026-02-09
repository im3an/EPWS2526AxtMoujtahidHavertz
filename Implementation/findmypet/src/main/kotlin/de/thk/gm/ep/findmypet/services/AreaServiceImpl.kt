package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.AreaRequestDto
import de.thk.gm.ep.findmypet.dtos.AreaResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.enums.Priority
import de.thk.gm.ep.findmypet.models.Area
import de.thk.gm.ep.findmypet.models.Coordinate
import de.thk.gm.ep.findmypet.repositories.AreaRepository
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*

@Service
class AreaServiceImpl(
    private val areaRepository: AreaRepository,
    private val missingReportRepository: MissingReportRepository
) : AreaService {
    override fun getAll(): List<AreaResponseDto> {
        return areaRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(areaId: UUID): AreaResponseDto? {
        return areaRepository.findByIdOrNull(areaId)?.toResponseDto()
    }

    override fun save(areaRequestDto: AreaRequestDto, missingReportId: UUID): AreaResponseDto {
        val missingReport = missingReportRepository.findByIdOrNull(missingReportId) ?: throw NoSuchElementException("No matching report found for id $missingReportId")

        val area = Area(
            searched = areaRequestDto.searched,
            lastSearched = null,
            missingReport = missingReport,
            coordinates = areaRequestDto.coordinates.map { dto ->
                Coordinate(dto.longitude,dto.latitude)
            }
        )

        return areaRepository.save(area).toResponseDto()
    }

    @Transactional
    override fun update(areaRequestDto: AreaRequestDto, missingReportId: UUID, areaId: UUID): AreaResponseDto? {
        val areaToUpdate = areaRepository.findByMissingReportIdAndId(missingReportId, areaId)
            ?: return null

        areaToUpdate.apply {
            searched = areaRequestDto.searched
            coordinates = areaRequestDto.coordinates.map { dto ->
                Coordinate(dto.longitude, dto.latitude)
            }
        }

        return areaRepository.save(areaToUpdate).toResponseDto()
    }

    @Transactional
    override fun delete(areaReportId: UUID) {
        areaRepository.deleteById(areaReportId)
    }

    override fun getByMissingReport(missingReportId: UUID): List<AreaResponseDto> {
        return areaRepository.findByMissingReportId(missingReportId).toList().map { it.toResponseDto() }
    }

    override fun getByMissingReportAndId(missingReportId: UUID, areaId: UUID): AreaResponseDto? {
        return areaRepository.findByMissingReportIdAndId(missingReportId, areaId)?.toResponseDto()
    }

    @Transactional
    override fun updatePriority(areaId: UUID, priority: Priority): AreaResponseDto {
        val area = areaRepository.findByIdOrNull(areaId)
            ?: throw NoSuchElementException("No matching area found for id $areaId")
        area.priority = priority
        return area.toResponseDto()
    }


}