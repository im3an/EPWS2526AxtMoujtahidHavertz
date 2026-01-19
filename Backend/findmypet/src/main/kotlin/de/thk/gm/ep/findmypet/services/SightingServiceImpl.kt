package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.SightingRequestDto
import de.thk.gm.ep.findmypet.dtos.SightingResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto
import de.thk.gm.ep.findmypet.models.Sighting
import de.thk.gm.ep.findmypet.repositories.AccountRepository
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import de.thk.gm.ep.findmypet.repositories.SightingRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.util.UUID

@Service
class SightingServiceImpl(
    private val sightingRepository: SightingRepository,
    private val accountRepository: AccountRepository,
    private val missingReportRepository: MissingReportRepository,
): SightingService {
    override fun getSightingById(sightingId: UUID): SightingResponseDto? {
        return sightingRepository.findByIdOrNull(sightingId)?.toResponseDto()
    }

    override fun getAllSightingsByMissingReport(missingReportId: UUID): List<SightingResponseDto> {
        return sightingRepository.findAllByMissingReportId(missingReportId).toList().map { it.toResponseDto() }
    }

    override fun save(sightingRequestDto: SightingRequestDto, missingReportId: UUID): SightingResponseDto {
        val account = accountRepository.findByIdOrNull(sightingRequestDto.accountId)?: throw NoSuchElementException("Account not found")
        val missingReport = missingReportRepository.findByIdOrNull(missingReportId)?: throw NoSuchElementException("Missing report not found")

        val sighting = Sighting(
            account = account,
            missingReport = missingReport,
            location = sightingRequestDto.location,
            sightingDateTime = LocalDateTime.now()
        )

        return sightingRepository.save(sighting).toResponseDto()
    }

    override fun delete(missingReportId: UUID, sightingId: UUID) {
        sightingRepository.deleteById(sightingId)
    }
}