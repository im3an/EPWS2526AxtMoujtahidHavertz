package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.*
import de.thk.gm.ep.findmypet.models.Invitation
import de.thk.gm.ep.findmypet.repositories.InvitationRepository
import de.thk.gm.ep.findmypet.repositories.MissingReportRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.server.ResponseStatusException

@Service
class InvitationServiceImpl(
    @Value("\${app.frontend.join-url}") private val invitationUrl: String,
    private val invitationRepository: InvitationRepository,
    private val singleUseService: SingleUseService,
    private val participantsService: ParticipantsService,
    private val missingReportRepository: MissingReportRepository,
) : InvitationService {

    @Transactional
    override fun joinByTokenAsSingleUseAccount(joinRequestDto: JoinRequestDto, token: String): SingleUseResponseDto {
        val invitation = invitationRepository.findByToken(token)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Ungültiger Einladungslink")

        if (!invitation.isValid() || !invitation.isActive){
            throw ResponseStatusException(HttpStatus.GONE, "Einladungslink abgelaufen")
        }

        val singleUseRequest = SingleUseRequestDto(name = joinRequestDto.name)

        val newAccount = singleUseService.save(singleUseRequest)

        participantsService.save(ParticipantsRequestDto(newAccount.id, invitation.missingReport.id!!))

        return newAccount


    }

    @Transactional
    override fun createInvitation(invitationRequestDto: InvitationRequestDto): InvitationResponseDto {
        val missingReport = missingReportRepository.findByIdOrNull(invitationRequestDto.missingReportId) ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Missing Report")
        val invitation = Invitation(missingReport = missingReport)

        val invitationUrl = invitationUrl + invitation.token
        return invitationRepository.save(invitation).toResponseDto(invitationUrl)
    }


}