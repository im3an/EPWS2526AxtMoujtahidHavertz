package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Area
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface AreaRepository: CrudRepository<Area, UUID> {
    fun findByMissingReportId(missingReportId: UUID): List<Area>
    fun findByMissingReportIdAndId(missingReportId: UUID, id: UUID): Area?
}