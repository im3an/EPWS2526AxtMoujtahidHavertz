package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.dtos.InvitationRequestDto
import de.thk.gm.ep.findmypet.dtos.InvitationResponseDto
import de.thk.gm.ep.findmypet.dtos.JoinRequestDto
import de.thk.gm.ep.findmypet.dtos.SingleUseResponseDto

interface InvitationService {
    fun joinByTokenAsSingleUseAccount(joinRequestDto: JoinRequestDto): SingleUseResponseDto
    fun createInvitation(invitationRequestDto: InvitationRequestDto): InvitationResponseDto
}