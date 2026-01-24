package de.thk.gm.ep.findmypet.dtos

import de.thk.gm.ep.findmypet.models.Participants
import java.util.UUID

data class ParticipantsResponseDto(
    val accountId: UUID,
    val missingReportId: UUID
)

fun Participants.toResponseDto() = ParticipantsResponseDto(
    accountId = account.id!!,
    missingReportId = missingReport.id!!
)