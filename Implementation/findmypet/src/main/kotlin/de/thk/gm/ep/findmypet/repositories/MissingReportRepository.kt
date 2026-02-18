package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.MissingReport
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface MissingReportRepository: CrudRepository<MissingReport, UUID> {
    fun findByPetName(petName: String): MissingReport?
    fun findByOwnerId(ownerId: UUID): List<MissingReport>
    fun findByIsPublic(public: Boolean): List<MissingReport>

}