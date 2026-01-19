package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.AreaRequestDto
import de.thk.gm.ep.findmypet.dtos.AreaResponseDto
import de.thk.gm.ep.findmypet.services.AreaService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("/api/v1/missingReports/{missingReportId}/areas")
class AreaRestController(
    private val areaService: AreaService,
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun saveArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @Valid @RequestBody areaRequestDto: AreaRequestDto
    ): AreaResponseDto {
       return areaService.save(areaRequestDto, missingReportId)
    }

    @GetMapping
    fun getAreas(
        @PathVariable("missingReportId") missingReportId: UUID
    ): List<AreaResponseDto> {
       return areaService.getAll()
    }

    @GetMapping("{areaId}")
    fun getArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
    ): AreaResponseDto {
        return areaService.getById(areaId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    @PutMapping("{areaId}")
    fun updateArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
        @Valid @RequestBody areaRequestDto: AreaRequestDto
    ): AreaResponseDto? {
        return areaService.update(areaRequestDto, missingReportId, areaId)
    }

    @DeleteMapping()
    fun deleteAreas(
        @PathVariable("missingReportId") missingReportId: UUID,
    ){
        for (area in areaService.getByMissingReport(missingReportId)){
        areaService.delete(area.id)
        }
    }

    @DeleteMapping("{areaId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
    ){
        areaService.delete(areaId)
    }

}




