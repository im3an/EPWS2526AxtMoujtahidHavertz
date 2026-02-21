package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.services.MissingReportService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import java.util.*

@Controller()
@RequestMapping("/")
class missingreportConrtoller(
    private val missingReportService: MissingReportService
) {
    @GetMapping("ownerMap/{missingReportId}")
    fun ownerMap(model: Model, @PathVariable missingReportId: UUID): String {
        model.addAttribute("missingReport",missingReportService.getById(missingReportId))
        return "ownerMap"
    }

    @GetMapping("participantMap/{missingReportId}")
    fun participantMap(model: Model, @PathVariable missingReportId: UUID): String {
        model.addAttribute("missingReport",missingReportService.getById(missingReportId))
        return "participantMap"
    }

}