package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Account
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import org.springframework.stereotype.Service

@Service
interface ParticipantsService {
    fun getAll(): List<Participants>
    fun getById(id: ParticipantsId): Participants?
    fun getByAccount(account: Account): List<Participants>
    fun getByMissingReport(missingReport: MissingReport): List<Participants>
    fun save(participants: Participants)
    fun delete(participants: Participants)

}