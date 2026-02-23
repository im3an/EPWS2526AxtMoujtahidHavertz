package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.MissingReportPreviewResponseDto
import de.thk.gm.ep.findmypet.services.MissingReportService
import org.springframework.data.domain.Page
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
@RequestMapping("/api/reports")
class SearchRestController(private val missingReportService: MissingReportService) {

    @GetMapping("/search")
    fun searchReports(
        @RequestParam(required = false) petName: String?,
        @RequestParam(required = false) species: String?,
        @RequestParam(required = false) color: String?,
        @RequestParam(required = false) petSize: String?,
        @RequestParam(required = false) age: String?,
        @RequestParam(required = false) lat: Double?,
        @RequestParam(required = false) lon: Double?,
        @RequestParam(defaultValue = "30.0") radius: Double,
        @RequestParam(defaultValue = "0") page: Int,
        @RequestParam(defaultValue = "6") size: Int
    ): Page<MissingReportPreviewResponseDto> {

        return missingReportService.search(
            lat, lon, radius,
            petName, species, color, petSize, age,
            page, size
        )
    }
}