package de.thk.gm.ep.findmypet.controller

import de.thk.gm.ep.findmypet.dtos.*
import de.thk.gm.ep.findmypet.services.InvitationService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/invitations")
class InvitationRestController(
    private val invitationService: InvitationService
) {

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createInvitation(
        @Valid @RequestBody dto: InvitationRequestDto
    ): InvitationResponseDto {
        return invitationService.createInvitation(dto)
    }

    @PostMapping("/join/{token}")
    fun joinViaToken(
        @Valid @RequestBody dto: JoinRequestDto,
        @PathVariable("token") token: String
    ): SingleUseResponseDto {
        return invitationService.joinByTokenAsSingleUseAccount(dto, token)
    }
}