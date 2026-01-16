package de.thk.gm.ep.findmypet.dtos

import java.util.UUID
import jakarta.validation.constraints.NotNull

//Von Gemini erstellen lassen
class ParticipantsDto(
    @field:NotNull val accountId: UUID,
    @field:NotNull val missingReportId: UUID
)
