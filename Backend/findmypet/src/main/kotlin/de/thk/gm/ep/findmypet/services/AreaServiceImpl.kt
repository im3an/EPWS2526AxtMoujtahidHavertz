package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Area
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.repositories.AreaRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class AreaServiceImpl(private val areaRepository: AreaRepository) : AreaService {
    override fun getAll(): List<Area> {
        return areaRepository.findAll().toList()
    }

    override fun getById(id: UUID): Area? {
        return areaRepository.findById(id).orElse(null)

    }

    override fun save(area: Area): Area {
        return areaRepository.save(area)
    }

    override fun delete(area: Area) {
        areaRepository.delete(area)    }

    override fun getByMissingReport(missingReport: MissingReport): List<Area> {
        return areaRepository.findByMissingReport(missingReport)
    }

    override fun getByMissingReportAndId(missingReport: MissingReport, id: UUID): Area? {
        return areaRepository.findByMissingReportAndId(missingReport, id)
    }
}