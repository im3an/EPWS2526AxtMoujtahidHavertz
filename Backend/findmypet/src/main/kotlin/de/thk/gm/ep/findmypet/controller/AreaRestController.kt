package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.AreaDto
import de.thk.gm.ep.findmypet.models.Area
import de.thk.gm.ep.findmypet.models.Coordinate
import de.thk.gm.ep.findmypet.services.AreaService
import de.thk.gm.ep.findmypet.services.MissingReportService
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.*

@RestController
@RequestMapping("/api/v1/missingReports/{missingReportId}/areas")
class AreaRestController(
    private val areaService: AreaService,
    private val missingReportService: MissingReportService
) {

    @PostMapping
    fun saveArea(
        @RequestBody areaDto: AreaDto
    ): Area {
        val missingReport = missingReportService.getById(areaDto.missingReportId)
        return missingReport?.let {
            val area = Area(
                areaDto.searched,
                areaDto.lastSearch,
                areaDto.coordinates.map {
                    Coordinate(it.latitude, it.longitude)
                },
                missingReport
            )
            areaService.save(area)

        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")

    }

    @GetMapping
    fun getAreas(
        @PathVariable("missingReportId") missingReportId: UUID
    ): List<Area> {
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            return areaService.getByMissingReport(it)
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")

    }

    @GetMapping("{areaId}")
    fun getArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
    ): Area {
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            val areaToReturn = areaService.getByMissingReportAndId(it, areaId)
            return areaToReturn ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Area not found")
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")
    }

    @PutMapping("{areaId}")
    fun updateArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
        @RequestBody areaDto: AreaDto
    ){
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let { it ->
            val areaToUpdate = areaService.getByMissingReportAndId(it, areaId)
            areaToUpdate?.let {
                areaToUpdate.searched = areaDto.searched
                areaToUpdate.lastSearch = areaDto.lastSearch
                areaToUpdate.coordinates = areaDto.coordinates.map {
                    Coordinate(it.latitude, it.longitude)
                }

                areaService.save(areaToUpdate)
            } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Area not found")
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")

    }

    @DeleteMapping()
    fun deleteAreas(
        @PathVariable("missingReportId") missingReportId: UUID,
    ){
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            val areasToDelete = areaService.getByMissingReport(it)
            for (area in areasToDelete) {
                areaService.delete(area)
            }

        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")
    }

    @DeleteMapping("{areaId}")
    fun deleteArea(
        @PathVariable("missingReportId") missingReportId: UUID,
        @PathVariable("areaId") areaId: UUID,
    ){
        val missingReport = missingReportService.getById(missingReportId)
        missingReport?.let {
            val areaToDelete = areaService.getByMissingReportAndId(it, areaId)
            areaToDelete?.let {
            areaService.delete(areaToDelete)
            } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Area not found")
        } ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing report not found")
    }




}




