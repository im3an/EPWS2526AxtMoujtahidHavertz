package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Account
import de.thk.gm.ep.findmypet.models.MissingReport
import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import de.thk.gm.ep.findmypet.repositories.ParticipantsRepository
import org.springframework.stereotype.Service

@Service
class ParticipantsServiceImpl(
    private val participantsRepository: ParticipantsRepository
): ParticipantsService {
    override fun getAll(): List<Participants> {
        return participantsRepository.findAll().toList()
    }

    override fun getById(id: ParticipantsId): Participants? {
        return participantsRepository.findById(id).orElse(null)
    }

    override fun getByAccount(account: Account): List<Participants> {
        return participantsRepository.findByAccount(account)
    }

    override fun getByMissingReport(missingReport: MissingReport): List<Participants> {
        return participantsRepository.findByMissingReport(missingReport)
    }

    override fun save(participants: Participants) {
        participantsRepository.save(participants)
    }

    override fun delete(participants: Participants) {
        participantsRepository.delete(participants)
    }

}