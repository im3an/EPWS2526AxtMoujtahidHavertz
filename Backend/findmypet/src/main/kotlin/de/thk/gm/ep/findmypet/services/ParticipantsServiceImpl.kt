package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.ParticipantsRequestDto
import de.thk.gm.ep.findmypet.dtos.ParticipantsResponseDto
import de.thk.gm.ep.findmypet.dtos.toResponseDto

import de.thk.gm.ep.findmypet.models.Participants
import de.thk.gm.ep.findmypet.models.ParticipantsId
import de.thk.gm.ep.findmypet.repositories.AccountRepository
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import de.thk.gm.ep.findmypet.repositories.ParticipantsRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.*

@Service
class ParticipantsServiceImpl(
    private val participantsRepository: ParticipantsRepository,
    private val accountRepository: AccountRepository,
    private val missingReportRepository: MissingReportRepository
): ParticipantsService {
    override fun getAll(): List<ParticipantsResponseDto> {
        return participantsRepository.findAll().toList().map { it.toResponseDto() }
    }

    override fun getById(id: ParticipantsId): ParticipantsResponseDto? {
        return participantsRepository.findByIdOrNull(id)?.toResponseDto()
    }

    override fun getByAccount(accountId: UUID): List<ParticipantsResponseDto> {
        return participantsRepository.findByAccountId(accountId).toList().map { it.toResponseDto() }
    }

    override fun getByMissingReport(missingReportId: UUID): List<ParticipantsResponseDto> {
        return participantsRepository.findByMissingReportId(missingReportId).toList().map { it.toResponseDto() }
    }

    override fun save(participantsRequestDto: ParticipantsRequestDto): ParticipantsResponseDto {
        val account = accountRepository.findByIdOrNull(participantsRequestDto.accountId)
            ?: throw NoSuchElementException("Account ${participantsRequestDto.accountId} not found")

        val missingReport = missingReportRepository.findByIdOrNull(participantsRequestDto.missingReportId)
            ?: throw NoSuchElementException("Report ${participantsRequestDto.missingReportId} not found")

        val participant = Participants(
            participantId = ParticipantsId(account.id, missingReport.id),
            account = account,
            missingReport = missingReport
        )

        return participantsRepository.save(participant).toResponseDto()
    }

    override fun delete(accountId: UUID, missingReportId: UUID) {
        val id = ParticipantsId(accountId, missingReportId)
        participantsRepository.deleteById(id)
    }


}