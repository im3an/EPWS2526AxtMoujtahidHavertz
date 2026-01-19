package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ParticipantsRepository: CrudRepository<Participants, ParticipantsId> {
    fun findByAccountId(accountId: UUID): List<Participants>
    fun findByMissingReportId(missingReportId: UUID): List<Participants>

}