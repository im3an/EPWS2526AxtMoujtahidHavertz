package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class MissingReportServiceImpl(private val missingReportRepository: MissingReportRepository): MissingReportService {
    override fun getAll(): List<MissingReport> {
        return missingReportRepository.findAll().toList()
    }

    override fun getById(id: UUID): MissingReport? {
        return missingReportRepository.findById(id).orElse(null)
    }

    override fun save(missingReport: MissingReport) {
        missingReportRepository.save(missingReport)
    }

    override fun delete(missingReport: MissingReport) {
        missingReportRepository.delete(missingReport)
    }

    override fun getByOwnerId(ownerId: UUID): List<MissingReport> {
        return missingReportRepository.findByOwnerId(ownerId)
    }
}