package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.MissingReportDto
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.services.MissingReportService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("api/v1/missingReports")
class MissingReportsRestController(
    private val missingReportService: MissingReportService
) {

    @PostMapping
    fun saveMissingReport(
        @Valid @RequestBody missingReportDto: MissingReportDto
    ): MissingReport{
        val missingReport = MissingReport(
            missingReportDto.petName,
            missingReportDto.location,
            missingReportDto.description,
            "Platzhalter",
            missingReportDto.public,
            UUID.randomUUID(),
            missingReportDto.status//Platzhalter später wird die ID über Principal abgerufen (Spring Boot Security)
        )
        missingReportService.save(missingReport)
        return missingReport
    }

    @GetMapping
    fun getMissingReports(): List<MissingReport>{
        return missingReportService.getAll()
    }

    @GetMapping("/{missingReportId}")
    fun getMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID
        ): MissingReport{
            val missingReport: MissingReport? = missingReportService.getById(missingReportId)
            return missingReport ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }

    @PutMapping("/{missingReportId}")
    fun updateMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID,
        @Valid @RequestBody missingReportDto: MissingReportDto
    ){
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            missingReport.petName = missingReportDto.petName
            missingReport.description = missingReportDto.description
            missingReport.public = missingReportDto.public
            missingReport.location = missingReportDto.location
            missingReport.status = missingReportDto.status
            missingReportService.save(missingReport)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    //WICHTIG!!
    //Wenn Missing Report gelöscht wird müssen auch die Areas gelöscht werden
    //Aktuell noch nicht implementiert
    @DeleteMapping("/{missingReportId}")
    fun deleteMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID
    ){
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            missingReportService.delete(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }
}