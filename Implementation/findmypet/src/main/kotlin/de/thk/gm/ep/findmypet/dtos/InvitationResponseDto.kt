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
    val invitationUrl: String = ""

)

fun Invitation.toResponseDto(url: String) = InvitationResponseDto(
    isActive = isActive,
    token = token,
    missingReportId = missingReport.id!!,
    id = id!!,
    expirationDate = expirationDate,
    invitationUrl = url
)