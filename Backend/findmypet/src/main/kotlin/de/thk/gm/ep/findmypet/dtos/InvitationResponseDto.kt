package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Invitation
import java.time.LocalDateTime
import java.util.*

data class InvitationResponseDto (
    val isActive:Boolean,
    val token: String,
    val missingReportId: UUID,
    val id: UUID,
    val expirationDate: LocalDateTime,

)

fun Invitation.toResponseDto() = InvitationResponseDto(isActive, token, missingReport.id, id!!, expirationDate)