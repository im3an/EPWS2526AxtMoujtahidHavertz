package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.MissingReportRequestDto
import de.thk.gm.ep.findmypet.dtos.MissingReportResponseDto
import de.thk.gm.ep.findmypet.services.MissingReportService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("api/v1/missing-reports")
class MissingReportsRestController(
    private val missingReportService: MissingReportService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun saveMissingReport(
        @Valid @RequestBody missingReportRequestDto: MissingReportRequestDto
    ): MissingReportResponseDto {
        return missingReportService.save(missingReportRequestDto)

    }


    @GetMapping
    fun getMissingReports(): List<MissingReportResponseDto>{
        return missingReportService.getAll()
    }

    @GetMapping("/{missingReportId}")
    fun getMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID
        ): MissingReportResponseDto?{
            return missingReportService.getById(missingReportId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
        }

    @PutMapping("/{missingReportId}")
    fun updateMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID,
        @Valid @RequestBody missingReportRequestDto: MissingReportRequestDto
    ): MissingReportResponseDto?{
        return missingReportService.update(missingReportRequestDto, missingReportId)
    }

    //WICHTIG!!
    //Wenn Missing Report gelöscht wird müssen auch die Areas gelöscht werden
    //Aktuell noch nicht implementiert
    @DeleteMapping("/{missingReportId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteMissingReport(
        @PathVariable("missingReportId") missingReportId: UUID
    ){
       missingReportService.delete(missingReportId)
    }
}