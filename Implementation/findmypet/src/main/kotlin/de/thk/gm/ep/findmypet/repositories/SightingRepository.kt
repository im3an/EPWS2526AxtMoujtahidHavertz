package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Sighting
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface SightingRepository: CrudRepository<Sighting, UUID> {
    fun findAllByMissingReportId(missingReportId: UUID): List<Sighting>
}