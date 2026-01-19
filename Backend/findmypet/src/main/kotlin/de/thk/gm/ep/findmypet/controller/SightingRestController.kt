package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.SightingRequestDto
import de.thk.gm.ep.findmypet.dtos.SightingResponseDto
import de.thk.gm.ep.findmypet.services.SightingService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("/api/v1/missing-report/{missingReportId}/sightings")
class SightingRestController(
    private val sightingService: SightingService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun reportSighting(
        @Valid @RequestBody dto: SightingRequestDto,
        @PathVariable("missingReportId") missingReportId: UUID
    ): SightingResponseDto {
        return sightingService.save(dto, missingReportId)
    }

    @GetMapping
    fun getSightingsByReport(
        @PathVariable missingReportId: UUID
    ): List<SightingResponseDto> {
        return sightingService.getAllSightingsByMissingReport(missingReportId)
    }

    @GetMapping("/{sightingId}")
    fun getSightingById(
        @PathVariable("sightingId") sightingId: UUID,
        @PathVariable("missingReportId") missingReportId: UUID
    ): SightingResponseDto {
        return sightingService.getSightingById(sightingId)?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "sighting not found")
    }

    @DeleteMapping("/{sightingId}")
    fun deleteSighting(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("sightingId") sightingId: UUID
    ) {
        sightingService.delete(missingReportId, sightingId)
    }
}