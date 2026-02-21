package de.thk.gm.ep.findmypet.controller

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
        val userLat = lat ?: 50.9375
        val userLon = lon ?: 6.9603

        val reportsPage = missingReportService.getNearbyReports(userLat, userLon, radius, 0, 6)

        model.addAttribute("reports", reportsPage.content)

        // WICHTIG: Diese beiden Zeilen fehlen wahrscheinlich bei dir!
        model.addAttribute("lat", userLat)
        model.addAttribute("lon", userLon)

        return "index"
    }
}