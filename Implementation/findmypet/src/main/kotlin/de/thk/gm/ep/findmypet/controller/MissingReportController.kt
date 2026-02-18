package de.thk.gm.ep.findmypet.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import java.util.UUID

@Controller
@RequestMapping("/missing-reports")
class MissingReportController(private val missingReportsRestController: MissingReportsRestController) {

    @GetMapping("/create")
    fun showCreateForm(): String {
        return "createReport"
    }

    @GetMapping("/{missingReportId}")
    fun showMissingReport(
        @PathVariable missingReportId: UUID,
        model: Model
    ): String {
        val missingReport = missingReportsRestController.getMissingReport(missingReportId) ?: throw IllegalArgumentException("Missing report $missingReportId")
        model.addAttribute("missingReport", missingReport)
        return "showReport"
    }
}