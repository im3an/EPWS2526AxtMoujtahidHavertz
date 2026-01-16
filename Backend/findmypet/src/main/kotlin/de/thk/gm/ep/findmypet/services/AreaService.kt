package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Area
import de.thk.gm.ep.findmypet.models.MissingReport
import org.springframework.stereotype.Service
import java.util.UUID

@Service
interface AreaService {
    fun getAll(): List<Area>
    fun getById(id: UUID): Area?
    fun save(area: Area): Area
    fun delete(area: Area)
    fun getByMissingReport(missingReport: MissingReport): List<Area>
    fun getByMissingReportAndId(missingReport: MissingReport, id: UUID): Area?

}