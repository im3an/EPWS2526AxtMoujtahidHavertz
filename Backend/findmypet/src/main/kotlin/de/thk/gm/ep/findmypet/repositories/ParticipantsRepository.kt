package de.thk.gm.ep.findmypet.repositories

import de.thk.gm.ep.findmypet.models.Account
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ParticipantsRepository: CrudRepository<Participants, ParticipantsId> {
    fun findByAccount(account: Account): List<Participants>
    fun findByMissingReport(missingReport: MissingReport): List<Participants>

}