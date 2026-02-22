package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.services.MissingReportService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class HomeController(private val missingReportService: MissingReportService) {
    @GetMapping("/")
    fun getHome(
        @RequestParam(required = false) lat: Double?,
        @RequestParam(required = false) lon: Double?,
        @RequestParam(defaultValue = "50.0") radius: Double,
        model: Model
    ): String {
        if (lat != null && lon != null) {
        val reportsPage = missingReportService.getNearbyReports(lat, lon, radius, 0, 6)
        model.addAttribute("lat", lat)
        model.addAttribute("lon", lon)
        model.addAttribute("reports", reportsPage.content)

        } else {
            val reportsPage = missingReportService.getAll()
            model.addAttribute("reports", emptyList<MissingReport>())
        }

        return "index"
    }
}