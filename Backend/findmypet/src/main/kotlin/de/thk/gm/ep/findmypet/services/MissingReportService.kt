package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.MissingReport
import org.springframework.stereotype.Service
import java.util.*

@Service
interface MissingReportService {
    fun getAll(): List<MissingReport>
    fun getById(id: UUID): MissingReport?
    fun save(missingReport: MissingReport)
    fun delete(missingReport: MissingReport)
    fun getByOwnerId(ownerId: UUID): List<MissingReport>

}